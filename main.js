const { app, Menu, BrowserWindow, ipcMain, dialog } = require("electron");

let win = null;
var syncEnabled = true;

//Mac only stop sync option in dock menu
const dockMenu = Menu.buildFromTemplate([
  {
    label: "Stop Sync",
    click() {
      console.log("Stop Sync");
      if (win) {
        syncEnabled = false;
        win.close();
        syncEnabled = true;
        win = null;
      }
    }
  }
]);

function startApp() {
  createWindow();
  if (process.platform === "darwin") {
    app.dock.setMenu(dockMenu);
  }
}

function createWindow() {
  win = new BrowserWindow({
    width: 750,
    height: 550,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }, //      devTools: false
  });
  //  win.webContents.openDevTools();
  win.loadURL(`file://${__dirname}/index.html`);
  // On Mac window close hide it and close it on quit
  win.on('close', (event) => {
    if (!app.quitting && syncEnabled) {
      event.preventDefault();
      win.hide();
    }
  })
}

app.on("ready", startApp);
app.on("will-navigate", function (event) {
  event.preventDefault();
});
// On Mac window close hide it and close it on quitn
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => { win ? win.show() : createWindow()})

app.on('before-quit', () => app.quitting = true)

ipcMain.handle("open-file-dialog", async (event) => {
  const buf = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"],
  });
  return buf.filePaths;
});

ipcMain.handle("app-name", (event) => {
  return app.getName();
});
