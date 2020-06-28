const { app, BrowserWindow, ipcMain, dialog } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 750,
    height: 550,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
//      devTools: false,
    },
  });
  win.loadURL(`file://${__dirname}/index.html`);
}

app.on("ready", createWindow);
app.on("will-navigate", function (event) {
  event.preventDefault();
});

ipcMain.handle("open-file-dialog", async (event) => {
  const buf = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"],
  });
  return buf.filePaths;
});

ipcMain.handle("app-name", (event) => {
  return app.getName();
});
