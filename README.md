# cloudydesktop
Desktop application that uses Cloudinary's CLI to automatically sync a local folder to a Cloudinary folder.
# installing
Requirements:

[Node](https://nodejs.org/en/) and [git](https://git-scm.com/downloads) are required to be installed. 
To confirm they are installed run (on Mac use terminal, on windows use powershell):
```bash
# These commands should print the version of each process when they are installed
% node -v
% npm -v
% git -v
```

Cloudinary [CLI](https://cloudinary.com/documentation/cloudinary_cli) is required, to install it:
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

# Install the dependencies and run
% npm install
% npm start
```

Configuration:

Run the Cloudydesktop application, set your Cloudinary account details (cloud name, API key and API secret) and save them.
Select the local folder you want to upload to Cloudinary and the Cloudinary folder name in which files will be stored.

Notes:

- Files are uploaded as public to Cloudinary.
- The Cloudinary folder you set will be created under cloudydesktop folder in Cloudinary (and not under the root directory) so that there are less chances of messing up an existing folder.
- When the sync is running, files deleted from your local folder will be deleted from the Cloudinary folder as well.

Running:

To start the sync operation click Sync Now, if all is well the button will show Sync On and the sync icon will keep rotating. After performing an initial sync the application will continue to monitor changes done to your local folder and it will update the Cloudinary folder with changes automatically.

