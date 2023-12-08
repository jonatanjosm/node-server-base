const config = require("./config");
const db = require('mongoose');
const logger = require("../utils/logger");

const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = config.mongoConnection.replace("<password>", PASSWORD ).replace("myFirstDatabase", DB_NAME);

//logger(MONGO_URI);

try{

    db.Promise = global.Promise;
    db.connect(MONGO_URI,{
        useNewUrlParser: true
    });

    logger("Database connection established");
}catch(err){
    logger("An error has occurred while connecting database", 'error');
    logger(err, 'error');
}    
