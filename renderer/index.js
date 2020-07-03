const { electron, ipcRenderer } = require("electron");
const Store = require("electron-store");
const store = new Store();
const keytar = require("keytar");
const os = require("os");
const placeHolder = "***************************";
var watcher = require("./renderer/local.js");
var appName = "appName";
const keytarAccount = os.userInfo().username;

const selectDirBtn = document.getElementById("selectDirectory");
const saveKeysBtn = document.getElementById("saveKeys");
const runSyncBtn = document.getElementById("myBtn");

selectDirBtn.addEventListener("click", async function (event) {
  const data = await ipcRenderer.invoke("open-file-dialog");
  document.getElementById("localFolderPath").value = data;
});

saveKeysBtn.addEventListener("click", function (event) {
  saveForm();
});

runSyncBtn.addEventListener("click", function (event) {
  saveForm();
  start();
});

async function getAppName() {
  appName = await ipcRenderer.invoke("app-name");
}

function saveForm() {
  store.set("cloudName", document.getElementById("cloudName").value);
  store.set("apiKey", document.getElementById("apiKey").value);
  setPassword(document.getElementById("apiSecret").value);
  saveConfigForm();
}

function saveConfigForm() {
  store.set(
    "localFolderPath",
    document.getElementById("localFolderPath").value
  );
  store.set("cloudinaryPath", document.getElementById("cloudinaryPath").value);
}

function readFields() {
  readApiKeys();
  readUserConfig();
  getAppName();
}

function readApiKeys() {
  document.getElementById("cloudName").value = store.get("cloudName");
  document.getElementById("apiKey").value = store.get("apiKey");
  if (store.get("isApiSecretStored")) {
    document.getElementById("apiSecret").value = placeHolder;
  }
}

function readUserConfig() {
  document.getElementById("localFolderPath").value = store.get(
    "localFolderPath"
  );
  document.getElementById("cloudinaryPath").value = store.get("cloudinaryPath");
}

function setPassword(secret) {
  if (secret && secret != placeHolder) {
    keytar.setPassword(appName, keytarAccount, secret);
    store.set("isApiSecretStored", true);
  }
}

function getLocalPath() {
  return store.get("localFolderPath");
}

function getCldFolderPath() {
  return store.get("cloudinaryPath");
}

function getApiKey() {
  return store.get("apiKey");
}

function getCldName() {
  return store.get("cloudName");
}

function start() {
  const apiSecret = keytar.getPassword(appName, keytarAccount);
  apiSecret.then((result) => {
    const data = {
      localPath: getLocalPath(),
      cldPath: getCldFolderPath(),
      apiKey: getApiKey(),
      apiSecret: result,
      cldName: getCldName(),
    };
    watcher(data);
  });
}

readFields();
