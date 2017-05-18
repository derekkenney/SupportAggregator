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
console.log('Cron job');
var rule = new cron.RecurrenceRule();
//rule.dayOfWeek = new cron.Range(0, 6, 1);
//rule.hour = 5;
rule.minute = new cron.Range(0,59,1);

cron.scheduleJob(rule, function(){
	console.log('Started Cron job');
	var mainCureImport = require('./cure.js');
	var mainCureDump = new mainCureImport;
	console.log('Starting mainCureDump');
	mainCureDump.CurePump();
	console.log('Ending mainCureDump');
});

//cron.scheduleJob(rule);
