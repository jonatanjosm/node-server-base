const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/network/routes');
require('./src/config/dbConfig');
const config = require('./src/config/config');
const cors = require('cors');
const app = express();
const fs = require('fs');
const https = require('node:https');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
 
app.use(express.static('public'));

//const whitelist = ['http://localhost:3030'];
const options = {
  origin: (origin, callback) => {
    callback(null, true)
    /*if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }*/
  }
}
app.use(cors(options));

router(app);

if(config.pemPrivateKey != null && config.pemCertificate != null) {

  var optionsSsl = {
    key: fs.readFileSync(config.pemPrivateKey),
    cert: fs.readFileSync(config.pemCertificate),
  };

  var server = https.createServer(optionsSsl, app).listen(config.port, function(){
    console.log("Express server listening on port " + config.port);
  });
  

} else {
  app.listen(config.port);
}
