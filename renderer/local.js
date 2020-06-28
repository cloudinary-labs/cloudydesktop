const { spawn } = require("child_process");
var cliSyncRunning = false;
const rootCldDir = "cloudydesktop/";

function startWatcher(data) {
  var chokidar = require("chokidar");
  process.env.CLOUDINARY_URL =
    "cloudinary://" + data.apiKey + ":" + data.apiSecret + "@" + data.cldName;
  console.log("start watching ", data.localPath);

  var watcher = chokidar.watch(data.localPath, {
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

function runCliSync(localPath, cldPath) {
  if (!cliSyncRunning) {
    startSync();
    const cld = spawn("/usr/local/bin/cld", [
      "sync",
      "--push",
      "--force",
      localPath,
      rootCldDir + cldPath,
    ]);

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
}

function stopSync(code) {
  cliSyncRunning = false;
  const myBtn = document.getElementById("myBtn");
  const regex = new RegExp("Sync (Run|On|Now|Error)");
  const label = myBtn.innerHTML.replace(
    regex,
    code == 0 ? "Sync On" : "Sync Error"
  );
  myBtn.innerHTML = label;
  document.getElementById("animateSvg").setAttribute("begin", "0s");
}

module.exports = function (data) {
  startWatcher(data);
};
