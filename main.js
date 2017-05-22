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

	console.log
	("Calling cure service GetCureData.")
	var cureData =_cureService.GetCureData();

	if("undefined" === typeof cureData){
		console.log("There was no Cure data returned.");
	}

	if("undefined" !== typeof cureData){
		console.log("Saving Cure data to MongoDB");
		_cureService.SaveCureData(cureData);
	}

});

cron.scheduleJob(rule);
