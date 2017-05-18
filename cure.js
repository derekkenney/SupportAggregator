/**
 *
 */
function Cure(){
console.log('This is for Cure');
};

Cure.prototype.CurePump = function(){
	var cureService = require('./dataDumpClass.js');
	var _cfEnv = require("./config/Environment.js");

	//Create a configuration object to be used by the repository class
	console.log("Getting an environment configuration object.");
	var envConfig = new EnvironmentConfiguration();

	//environment contains the CF env data as well as the mongdb data for the service bound to the CF app.
	var _cfEnv = envConfig.GetEnvironmentConfigurationData();

	console.log("Created an CF Environment object.");

	//create an instance of a Cure config using the environment config object. Cure config contains
	//the data needed for connecting to the CURE SqlDB.

	//create an instance of CureDB repo. Pass the appropriate config object into the constructor

	var cureDump = new cureImport('Cure', 'csMongodb');
	cureDump.sendLoad();
};
module.exports = Cure;
