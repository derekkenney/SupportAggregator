var BeginOffSet, EndOffSet, envConfigData, cureConfigData, cdata, appEnv;
const stack = new Error().stack;
const ecode = new Error().code;
const fs = require('fs');
const fiscalMonth = require("./models/fiscalmonth.js")
const mongoDbRepo = require("./repositories/CureMongoDB.js");
const cfEnv = require('cfenv');
const envConf = require('./config/environmentconfiguration.js');
const cureConf = require('./config/cureconfiguration.js');


const getSupportTickets = (args, callback) => {
	mongoDbRepo.Get(function(err, result) {

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
saveSupportTicket = function(data, callback) {
	try {
		console.log("Saving Cure data into MongoDB")
		//call insert function of mongorepo
		_cureMongoDBRepo.InsertDocuments(cureData, _fiscalMonth, function(err, result){
			//pass the result returned from the repo to the callback function
			callback(err, result)
		})
	} catch (e) {
			console.log("Cure Service: An error occurred " + e);
			callback("An error occurred: " + e, null);
	}
}
module.exports = {
	getSupportTickets: getSupportTickets
}
