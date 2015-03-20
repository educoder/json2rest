# json2rest
Little node.js tool that reads local JSON files and POSTs them to a RESTful interface.

The main usage is in combination with [DrowsyDromedary](https://github.com/educoder/DrowsyDromedary) and aims to provide a easy way to upload large JSON arrays from files into a MongoDB collection.

Please note that the original DrowsyDromedary was written by [Matt Zukowski](https://github.com/zuk "Matt's github profile") and can be found here: https://github.com/zuk/DrowsyDromedary

## Copyright and license
This software is available under the GPL v2.0 license (see license file in this repo for details)

Copyright (C) 2015 [Armin Krauss](https://github.com/mackrauss "Armin's github profile")

## Installation
```
git clone https://github.com/educoder/json2rest.git
cd json2rest
npm install
```

## Usage

Against a server using HTTPS
```
cd json2rest
node app.js pathtodrowsy/databasename/collection path/to/data.json drowsy.url.at.yourdomain.com 443 user:password
```

Against a local drowsy instance
```
cd json2rest
node app.js hampshire-apps/testing path/to/data.json localhost 9292
```

Please note that the first two parameters are required and the last three are optional (no auth, localhost, 8000).

### Parameter breakdown
1. The path part of the URL not the domain (On DrowsyDromedary this is usually database/collection or path/to/drowsy/database/collection)
2. path to and name of json file to read the data from (*must* be an Array)
3. domain part of the URL (could be anything with subdomains and such like drowsy.yourdomain.com or just yourdomain.com if that is serving Drowsy or Drowsy is under that domain but a certain path. Your choice here)
4. Port (should be 443 since there is no reason to take to a REST interface without SSL, especially considering that BasicAuth without SSL is 100% insecure)
5. BasicAuth username and password (highly recommend to activate BasicAuth on your Drowsy instance or the world is your guest)

