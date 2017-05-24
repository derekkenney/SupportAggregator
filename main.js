/**
 * http://usejsdoc.org/
 */

var d = new Date();
console.log('#########################################Starting#################################################\n'+
		'                         '+d+'             \n'+
		'########################################### GO ##################################################\n'+
		'                      This should start everyday at 5:00 AM EST or 1:00 AM GMT                               \n'
		);
var cron = require('node-schedule');
console.log('Entered the main function.');
var cureService = require('./cureservice.js');
var rule = new cron.RecurrenceRule();
//rule.dayOfWeek = new cron.Range(0, 6, 1);
//rule.hour = 5;
rule.minute = new cron.Range(0,59,1);

cron.scheduleJob(rule, function(){
	console.log('Started Cron job');
	console.log("Creating a cure service object");

	var _cureService = new cureService();

	console.log("Calling cure service GetCureData.")
	_cureService.GetCureData(function(cureData){
		console.log("Inside GetCureData callback function");

		if("undefined" === typeof cureData){
			console.log("No records returned from Cure query. Exiting process");
			process.exit();
		}

		console.log("Cure data returned by service call");
		console.log(cureData + "\n");
		console.log('#########################################SAVING#################################################\n')

		_cureService.SaveCureData(cureData, function(err, response){
			if(err){
				console.log("An error occurred saving Cure data to MongoDB: " + err)
				process.exit()
			}

			console.log("Mongo response:" + result)
			process.exit();
		})
 });
});

cron.scheduleJob(rule);
