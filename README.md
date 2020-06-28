# cloudydesktop
Desktop application that uses Cloudinary's CLI to automatically sync a local folder to a Cloudinary folder.
# installing
Requirements:
Cloudinary [CLI](https://cloudinary.com/documentation/cloudinary_cli) is required, to install it:
- Install [Python](https://www.python.org) version 3.6 or later.
- To install the Cloudinary CLI, open terminal (Mac) or command line (Windows) and run:
```bash
pip3 install cloudinary-cli
```

Node and npm are required to be installed as well, to confirm that run:
```bash
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

Installation:

```bash
# Clone the cloudydesktop repository
$ git clone https://github.com/cloudinary-labs/cloudydesktop

# Go into the repository
$ cd cloudydesktop

# Install the dependencies and run
$ npm install && npm start
```

Configuration:

Run the Cloudydesktop application, set your Cloudinary account details (cloud name, API key and API secret) and save them.
Select the local folder you want to upload to Cloudinary and the Cloudinary folder name in which files will be stored.

Notes:

- Files are uploaded as public to Cloudinary.
- The Cloudinary folder you set will be created under cloudydesktop folder in Cloudinary (and not under the root directory) so that there are less chances of messing up an existing folder.
- Files deleted from your local folder will be deleted from the Cloudinary folder as well.

Running:

To start the sync operation click Sync Now, if all is well the button will show Sync On and the sync icon will keep rotating. After performing an initial sync the application will continue to monitor changes done to your local folder and it will update the Cloudinary folder with changes automatically.

