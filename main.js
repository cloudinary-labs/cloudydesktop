const { app, Menu, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

let win = null;

// checking the OS
const isMac = (process.platform === "darwin");
const isWin = (process.platform === "win32");

//Mac only stop sync option in dock menu
const dockMenu = Menu.buildFromTemplate([
  {
    label: "Stop Sync",
    click() {
      sendStopSync();
    }
  }
]);

//Win only stop sync option in thumbar
function setThumbar() {
  win.setThumbarButtons([
    {
      tooltip: "Stop Sync",
      icon: path.join(__dirname, "assets/app-icon/icon-idel1.png"),
      click() {
        sendStopSync();
      }
    }
  ]);
}
// Calling Renderer to stop sync
function sendStopSync() {
  console.log("Stop Sync");
  win.webContents.send("stop-sync");
}

function startApp() {
  createWindow();
  if (isMac) {
    app.dock.setMenu(dockMenu);
  }
  if (isWin) {
    setThumbar();
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
  // On Mac only, on window close hide it and close it on quit
  win.on('close', (event) => {
    if (!app.quitting && isMac) {
      event.preventDefault();
      win.hide();
    }
  })
}

app.on("ready", startApp);
app.on("will-navigate", function (event) {
  event.preventDefault();
});
// On Mac only, on window close hide it and close it on quit
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
app.on('activate', () => { win.show() })

app.on('before-quit', () => {if(isMac) {app.quitting = true}})

//Handle Renderer requests
ipcMain.handle("open-file-dialog", async (event) => {
  const buf = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"],
  });
  return buf.filePaths;
});

ipcMain.handle("app-name", (event) => {
  return app.getName();
});
