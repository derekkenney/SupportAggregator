/**
 * http://usejsdoc.org/
 */

var cron = require('node-cron');
cron.schedule('1*****', function(){
	console.log('Starting');
	var mainCureImport = require('./cure.js');
	var mainCureDump = new mainCureImport();
	mainCureDump();
})
