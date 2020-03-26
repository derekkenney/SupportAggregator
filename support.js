// Support Service - Responsible for querying for suuport tickets. Also receives HTTP requests, and saves support tickets.
var BeginOffSet, EndOffSet, envConfigData, cureConfigData, cdata, appEnv;
const stack = new Error().stack;
const ecode = new Error().code;
const fs = require('fs');
const repo = require("./store/mongo_repo.js");

async function getSupportTickets(startDate, endDate){
	// async call to repo object for tickets. returns either results or an error
	if("undefined" === typeof startDate) {
		return '{"message": "Start date argument is missing"}', 400
	}
	if("undefined" === typeof endDate) {
		return '{"message": "End date argument is missing"}', 400
	}
	const tickets = await repo.getTickets(startDate, endDate)
	return JSON.stringify(tickets), 200
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
