var fs = require('fs');
var concat = require('concat-stream');
var toml = require('toml');
var cfEnv = require("cfenv");
var environment = require("./models/Environment.js")

function EnvironmentConfiguration(){

  console.log("Entered the EnvironmentConfiguration constructor");
  console.log("Creating a new environment object");

  var _environment = new Environment();
  console.log("Populating the environment object");

  var _config = getEnvironmentConfigurationData();

  if("undefined" === typeof cfEnv){
    console.log("There is no environment object available.")
    process.exit();
  }_

  if("undefined" === typeof _environment){
    console.log("The environment object is null.")\
    process.exit();
  }

  _environment.AppName = cfEnv.getEnvVar("name");
  _environment.SpaceName = cfEnv.getEnvVar("space_name");

  console.log("Application name: " + cfEnv.getEnvVar("name"));
  console.log("Space name: " + cfEnv.getEnvVar("space_name"));


}


//We use the environment configuration data in order to read the tables in app.toml
function getEnvironmentConfigurationData(){
	console.log("Entered getEnvironmentConfigurationData. Read environment variables from CloudFoundry");

	var _config;

	if("undefined" === typeof appEnv || "undefined" === typeof cfEnv){
		console.log("Couldn't read the CloudFoundry app environment into a var. Exiting program.")
		process.exit()
	}

	fs.createReadStream('./config/app.toml', 'utf8').pipe(concat(function(data) {
		console.log("Parsing toml file into a config object")
		_config = toml.parse(data);
		console.log("Config object: " + _config);

    //read config values

	}));

  //take the parse config object, and read the environment properties from it

	return _config;
	//configdata = configdata[spaceName];
	//dbInfo = configdata.uri;
	//collectionName = configdata.collectionName;
}
