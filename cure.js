
function Cure(){
console.log('This is for Cure');

var cureService = require('CureService.js');
var envConfig = require("./config/EnvironmentConfiguration.js");

};

Cure.prototype.CurePump = function(){
	//Create a CF configuration object to be used by the MongoDB repository class
	console.log("Getting a CF environment configuration object.");

	//environment contains the CF env data as well as the mongdb data for the service bound to the CF app.
	var cfEnv = envConfig.GetEnvironmentConfigurationData();
	console.log("Created an CF Environment object.");

	//create an instance of a Cure config using the environment config object. Cure config contains
	//the data needed for connecting to the CURE SqlDB.

	//create an instance of CureDB repo. Pass the appropriate config object into the constructor

	var cureDump = new cureImport('Cure', 'csMongodb');
	cureDump.sendLoad();
};
module.exports = Cure;
