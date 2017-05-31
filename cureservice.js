/**
 *
 */
var destinationpath, querysql, sourcePath, sourceTableName, mongoInfo, dbCreds, dbInfo, collectionName;
var BeginOffSet, EndOffSet, envConfigData, cureConfigData, cdata, appEnv;
var origination = 2;
var stack = new Error().stack;
var ecode = new Error().code;
const fs = require('fs');
const cureDBRepo = require("./repositories/CureDB.js");
const cureMongoDbRepo = require("./repositories/CureMongoDB.js");
const cfEnv = require('cfenv');
const envConf = require('./config/environmentconfiguration.js');
const cureConf = require('./config/cureconfiguration.js');
var _cureDBRepo, _cureMongoDBRepo;

function CureService(){
	console.log("Entered CureService constructor.");
	console.log("Initialize objects");

	//Cure configuration variable
	var _cureConfig = new cureConf();

	//MongoDB and environment configuration variable
	var _envConfig = new envConf();
	//you can change the name of the collection on the _envConfig in the app.toml file before
	//sending it to the repo constructor

	//create repo objects to be used in the service. pass config objects into constructor
	_cureDBRepo = new cureDBRepo(_cureConfig);
	_cureMongoDBRepo = new cureMongoDbRepo(_envConfig);
}

CureService.prototype.GetCureData = function(options, callback) {
	console.log("Getting Cure data.");
	_cureDBRepo.Get(options, function(err, result) {

		if(err){
			callback(err, null)
		}

		console.log("Cure DB callback function. The results of the query should be available")
		callback(null, result);
	});
}

//create the SaveCureData function accepting a JSON collection, and callback function
//from the main file.
CureService.prototype.SaveCureData = function(err, cureData, callback) {

	try {
		console.log("Saving Cure data into MongoDB")
		//call insert function of mongorepo
		_cureMongoDBRepo.InsertDocuments(cureData, function(result){
			//pass the result returned from the repo to the callback function
			callback(result, null)
		})
	} catch (e) {
			console.log("Cure Service: An error occurred " + e);
			callback("An error occurred: " + e, null);
	}
}
module.exports = CureService;
