var fs = require('fs');
var _ = require('underscore');
// Via http://isolasoftware.it/2012/05/28/call-rest-api-with-node-js/
var https = require('https');
// http://stackoverflow.com/questions/11091974/ssl-error-in-nodejs/12683325#comment25535766_12683325
// forcing TLS v1 since server is secure and rejects SSLv2 and v3
https.globalAgent.options.secureProtocol = 'TLSv1_method';
// grab information from user to be more specific
var argv = require('optimist')
  .usage("Usage:\n\t$0 <collection to populate (incl. path)> <json file with data> <BasicAuth user:pwd (optional)> <database host (default 'localhost')> <database port (default 8000)>")
  .demand(2)
  .argv;

var COLLECTION = argv._[0];
var JSONFILE = argv._[1];
var AUTH = argv._[2] || null;
var HOST = argv._[3] || 'localhost';
var PORT = argv._[4] || 8000;

var jsonObject;


// Read data from JSON file into a JS object
if (COLLECTION !== null & typeof COLLECTION !== "undefined") {
    jsonObject = fs.readFileSync(JSONFILE, 'utf8');
} else {
    console.error("Cannot POST data if collection is unknown");
    console.error("Exit with error");
    process.exit(1);
}

// prepare the header
var postheaders = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
};

// the post options
var optionspost = {
    host : HOST,
    port : PORT,
    path : '/'+COLLECTION,
    method : 'POST',
    headers : postheaders
};

if (AUTH) {
    optionspost.auth = AUTH;
}

console.info('Options prepared:');
console.info(optionspost);
console.info('Do the POST calls');


var array = JSON.parse(jsonObject);

var date = new Date();


_.each(array, function(doc){
    var reqPost = https.request(optionspost, function(res) {
        console.log("statusCode: ", res.statusCode);
        // uncomment it for header details
        console.log("headers: ", res.headers);

        res.on('data', function(d) {
            console.info('POST result:\n');
            process.stdout.write(d);
            console.info('\n\nPOST completed');
        });
    });

    // set current dates (created_at and modified_at)
    doc.created_at = date;
    if (!doc.modified_at) {
        doc.modified_at = date;
    }

    // write the json data
    var jsonObj = JSON.stringify(doc);
    console.log(jsonObj);
    reqPost.write(jsonObj);
    reqPost.end();
    reqPost.on('error', function(e) {
        console.error("here is the error");
        console.error(e);
        process.exit(1);
    });
});

