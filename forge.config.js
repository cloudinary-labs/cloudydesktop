const dotenv = require('dotenv');
dotenv.config();

module.exports = { 
    "packagerConfig": {
        "icon": "assets/app-icon/icon",
        "osxSign": {
            "identity": "Developer ID Application: Cloudinary LTD (3TR999VVAS)",
            "hardened-runtime": true,
            "entitlements": "entitlements.plist",
            "entitlements-inherit": "entitlements.plist"
          }
      },
      "makers": [
        {
          "name": "@electron-forge/maker-squirrel",
          "config": {
            "name": "cloudydesktop"
          }
        },
        {
          "name": "@electron-forge/maker-zip",
          "platforms": [
            "darwin"
          ]
        },
        {
          "name": "@electron-forge/maker-deb",
          "config": {}
        },
        {
          "name": "@electron-forge/maker-rpm",
          "config": {}
        }
      ]
    }