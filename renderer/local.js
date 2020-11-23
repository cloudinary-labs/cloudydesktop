const { spawn } = require("child_process");
var cliSyncRunning = false;
const rootCldDir = "cloudydesktop/";
const cliMacPath = "/usr/local/bin";
let watcher = null;

/*
This module listens on local folder changes using chokidar.
On local folder change it runs the CLI to perofmr sync
*/

// Setting Cloudinary cloud name and API key and secret
function setEnvPath(data) {
  process.env.CLOUDINARY_URL =
    "cloudinary://" + data.apiKey + ":" + data.apiSecret + "@" + data.cldName;

  if (process.platform === "darwin" && !process.env.PATH.includes(cliMacPath)){
    process.env.PATH += (":" + cliMacPath);
  }
  console.log("start watching ", data.localPath);
  console.log("environment ", process.env.PATH);
}

// Running chokidar to listen on local folder changes
function startWatcher(data) {
  var chokidar = require("chokidar");
  setEnvPath(data);
  disableFolderSelection();
  stopWatcher();

  watcher = chokidar.watch(data.localPath, {
    ignored: /[\/\\]\./,
    persistent: true,
    ignoreInitial: true,
  });

  function onWatcherReady() {
    console.info(
      "From here can you check for real changes, the initial scan has been completed."
    );
    runCliSync(data.localPath, data.cldPath);
  }

  // Declare the listeners of the watcher
  watcher
    .on("add", function (path) {
      console.log("File", path, "has been added");
      runCliSync(data.localPath, data.cldPath);
    })
    .on("addDir", function (path) {
      console.log("Directory", path, "has been added");
      runCliSync(data.localPath, data.cldPath);
    })
    .on("change", function (path) {
      console.log("File", path, "has been changed");
      runCliSync(data.localPath, data.cldPath);
    })
    .on("unlink", function (path) {
      console.log("File", path, "has been removed");
      runCliSync(data.localPath, data.cldPath);
    })
    .on("unlinkDir", function (path) {
      console.log("Directory", path, "has been removed");
      runCliSync(data.localPath, data.cldPath);
    })
    .on("error", function (error) {
      console.log("Error happened", error);
    })
    .on("ready", onWatcherReady)
    .on("raw", function (event, path, details) {
      // This event should be triggered everytime something happens.
      console.log("Raw event info:", event, path, details);
    });
}

// Stop listening on local folder changes
function stopWatcher() {
  if(watcher) {
      watcher.close().then(() => {
        console.log("stopWatcher closed");
        stopSync(999);
      });
      watcher = null;
  }
}

// Running Cloudinary CLI
function runCliSync(localPath, cldPath) {
  if (!cliSyncRunning) {
    startSync();
    const cld = spawn("cld", [
      "sync",
      "--push",
      "--force",
      localPath,
      (rootCldDir + cldPath)],
      {shell: process.platform == 'win32'});

    cld.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    cld.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

    cld.on("error", (error) => {
      console.log(`error: ${error.message}`);
    });

    cld.on("close", (code) => {
      console.log(`cld cli end with code ${code}`);
      stopSync(code);
    });
  }
}

function startSync() {
  cliSyncRunning = true;
  const regex = new RegExp("Sync (Now|On|Error)");
  const label = document
    .getElementById("myBtn")
    .innerHTML.replace(regex, "Sync Run");
  document.getElementById("myBtn").innerHTML = label;
  document.getElementById("animateSvg").setAttribute("begin", "0s");
}

function stopSync(code) {
  cliSyncRunning = false;
  const myBtn = document.getElementById("myBtn");
  const regex = new RegExp("Sync (Run|On|Now|Error)");
  const label = myBtn.innerHTML.replace(
    regex,
    getSyncStatus(code)
  );
  myBtn.innerHTML = label;
  if(code == 0) {
    document.getElementById("mySvg").unpauseAnimations();
  }
  else {
    document.getElementById("mySvg").pauseAnimations();
    enableFolderSelection();
  }
}

function getSyncStatus(code) {
  if (code == 0) {
    return "Sync On"; 
  }
  else if (code == 999) {
    return "Sync Now"; 
  }
  else  { 
    return "Sync Error"; 
  }
}

// Disable the option to change folder setting shown in the UI while the sync is running
function disableFolderSelection() {
  document.getElementById("selectDirectory").disabled = true;
  document.getElementById("selectDirectory").style.backgroundColor = "DarkGray";
  document.getElementById("cloudinaryPath").disabled = true;
}

// Enable the option to change folder setting shown in the UI while the sync is not running
function enableFolderSelection() {
  document.getElementById("selectDirectory").disabled = false;
  document.getElementById("selectDirectory").style.backgroundColor = "#0078ff";
  document.getElementById("cloudinaryPath").disabled = false;
}

module.exports = {
  startWatcher,
  stopWatcher
};
