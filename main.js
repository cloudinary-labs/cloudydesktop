const { app, Menu, BrowserWindow, ipcMain, dialog } = require("electron");

let win = null;

const isMac = (process.platform === "darwin");
const isWin = (process.platform === "win");

//Mac only stop sync option in dock menu
const dockMenu = Menu.buildFromTemplate([
  {
    label: "Stop Sync",
    click() {
      console.log("Stop Sync");
      win.webContents.send("stop-sync");
    }
  }
]);

function setThumbar() {
  win.setThumbarButtons([
    {
      tooltip: "button1",
      icon: path.join(__dirname, "button1.png"),
      click() {
        console.log("button1 clicked");
      },
    },
    {
      tooltip: "button2",
      icon: path.join(__dirname, "button2.png"),
      flags: ["enabled", "dismissonclick"],
      click() {
        console.log("button2 clicked.");
      },
    },
  ]);
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
  // On Mac window close hide it and close it on quit
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
// On Mac window close hide it and close it on quitn
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
app.on('activate', () => { win.show() })

app.on('before-quit', () => {if(isMac) {app.quitting = true}})

ipcMain.handle("open-file-dialog", async (event) => {
  const buf = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"],
  });
  return buf.filePaths;
});

ipcMain.handle("app-name", (event) => {
  return app.getName();
});
