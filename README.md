# cloudydesktop
Desktop application that uses Cloudinary's CLI to automatically sync a local folder (and it subfolders) to a Cloudinary folder.
# installing
Requirements:

In order to compile the app on your machine [Node](https://nodejs.org/en/) and [git](https://git-scm.com/downloads) are required to be installed. 
To confirm they are installed run (on Mac use terminal, on windows use powershell):
```bash
# These commands should print the version of each process when they are installed
% node -v
% npm -v
% git -v
```

Cloudinary [CLI](https://cloudinary.com/documentation/cloudinary_cli) is required for the application to work, to install it:
- Install [Python](https://www.python.org) version 3.6 or later.
- To install the Cloudinary CLI, run (on Mac use terminal, on windows use powershell):
```bash
pip3 install cloudinary-cli
```

Cloudydesktop compile and run:

```bash
# Clone the cloudydesktop repository
% git clone https://github.com/cloudinary-labs/cloudydesktop

# Go into the repository
% cd cloudydesktop

# Get the dependencies and run the app from the local folder
% npm install
% npm start

# Build an app and install it on your machine
% npm run make
% cd out/cloudydesktop-<os-name>
# On windows create a shortcut to the .exe file in the folder
# On Mac copy the .app in the folder to your Computer Applications folder
```

Configuration:

Run the Cloudydesktop application, set your Cloudinary account details (cloud name, API key and API secret) and save them.
Select the local folder you want to upload to Cloudinary and the Cloudinary folder name in which files will be stored.

Notes:

- Files are uploaded as public to Cloudinary.
- The Cloudinary folder you set will be created under cloudydesktop folder in Cloudinary (and not under the root directory) so that there are less chances of messing up an existing folder.
- When the sync is running, files deleted from your local folder will be deleted from the Cloudinary folder as well.

# start sync

To start the sync operation click Sync Now, if all is well the button will show Sync On and the sync icon will keep rotating. After performing an initial sync the application will continue to monitor changes done to your local folder and it will update the Cloudinary folder with changes automatically. Once the Sync is on you can no longer change the path of the local or cloudinary folders. 

# stop sync

To stop the Sync or to change folders call stop sync. On Mac it is in the dock menu and on Win it is in the taskbar thumbnail menu or exit the application. Closing the window, on Mac it leaves the app running and on Win the application exits. To close the app on Mac select quit on the dock menu.

