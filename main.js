/**
 * http://usejsdoc.org/
 */
console.log('Starting');
var cron = require('node-schedule');
console.log('Cron job');
var rule = new cron.RecurrenceRule();
rule.minute = new cron.Range(0, 59, 1);
//rule.
cron.scheduleJob(rule, function(){
	console.log('Started Cron job');
	var mainCureImport = require('./cure.js');
	var mainCureDump = new mainCureImport;
	console.log('Starting mainCureDump');
	mainCureDump.CurePump();
	console.log('Ending mainCureDump');
});

//cron.scheduleJob(rule);
