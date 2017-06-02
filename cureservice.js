/**
 *
 */
var destinationpath, querysql, sourcePath, sourceTableName, mongoInfo, dbCreds, dbInfo, collectionName;
var BeginOffSet, EndOffSet, envConfigData, cureConfigData, cdata, appEnv;
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

CureService.prototype.GetCureData = function(optArgs, callback) {
	_cureDBRepo.Get(optArgs, function(err, result) {

		if(err){
			callback(err, null)
		}
		//We aren't mapping to a DTO before returning to the response. The collection can have different
		//documents. If this becomes a requirement, we will add mapping later.
		callback(null, result);
	});
}

//create the SaveCureData function accepting a JSON collection, and callback function
//from the main file.
CureService.prototype.SaveCureData = function(cureData, callback) {

	try {
		console.log("Saving Cure data into MongoDB")
		//call insert function of mongorepo
		_cureMongoDBRepo.InsertDocuments(cureData, function(err, result){
			//pass the result returned from the repo to the callback function
			callback(err, result)
		})
	} catch (e) {
			console.log("Cure Service: An error occurred " + e);
			callback("An error occurred: " + e, null);
	}
}
module.exports = CureService;
