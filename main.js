
console.log('Entered the main function.');
var cureService = require('./cureservice.js');
var _cureService = new cureService();

_cureService.GetCureData(function(cureData){
	console.log("Inside GetCureData callback function");

	if("undefined" === typeof cureData){
		console.log("No records returned from Cure query. Exiting process");
		process.exit();
	}

	console.log("Cure data returned by service call");
	console.log(cureData + "\n");
	console.log('#########################################SAVING#################################################\n')

	_cureService.SaveCureData(cureData, function(result){
		console.log("Mongo response:" + result)
		process.exit();
	})
});
