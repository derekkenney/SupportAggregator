/**
 *
 */
function Cure(){
console.log('This is for Cure');
};

Cure.prototype.CurePump = function(){
	var cureService = require('./dataDumpClass.js');
	var envConfig = require("./config/Environment.js");

	//Create a configuration object to be used by the repository class
	console.log("Getting an environment configuration object.");
	var _config = new EnvironmentConfiguration();

	var cureDump = new cureImport('Cure', 'csMongodb');
	cureDump.sendLoad();
};
module.exports = Cure;
