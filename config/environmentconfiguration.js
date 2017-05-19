const fs = require('fs');
const concat = require('concat-stream');
const toml = require('toml');
const cfEnv = require("cfenv");
const environment = require("../models/cfenvironment.js");
var _env, _cfEnv, _config;

//Returns an environment object
function EnvironmentConfiguration(){

  console.log("Entered the EnvironmentConfiguration constructor");

  //Environment object for CF env values
  _env = new environment();

  if("undefined" === typeof cfEnv){
    console.log("There is no environment object available.");
    process.exit();
  }

  if("undefined" === typeof _env){
    console.log("The environment object is null.");
    process.exit();
  }
}


//We use the environment configuration data in order to read the tables in app.toml
EnvironmentConfiguration.prototype.GetEnvironmentConfigurationData = function(){
	console.log("Entered getEnvironmentConfigurationData. Read environment variables from CloudFoundry");

	if("undefined" === typeof cfEnv){
		console.log("Couldn't read the CloudFoundry app environment into a var. Exiting program.")
		process.exit()
	}

  console.log("Creating a new environment object");

	fs.createReadStream('./config/app.toml', 'utf8').pipe(concat(function(data) {
		console.log("Parsing toml file into a config object")
		_config = toml.parse(data);

    if("undefined" === typeof _config){
      console.log("There was an error parsing the environment configuration data. Exiting program.")
      process.exit();
    }

    console.log("Config object: " + _config);
    console.log("Populating the environment object");
    console.log("Application name: " + cfEnv.getEnvVar("name"));
    console.log("Space name: " + cfEnv.getEnvVar("space_name"));

    _env.AppName = cfEnv.getEnvVar("name");
    _env.SpaceName = cfEnv.getEnvVar("space_name");
    _env.Uri = _config.uri;
    _env.Server = _config.server;
    _env.Port = _config.port;
    _env.UserName = _config.userName;
    _env.Password = _config.password;
    _env.CollectionName = _config.collectionName;
    _env.ServiceName = _config.dbServiceName;

    return _env;
	}));
}
module.exports = EnvironmentConfiguration;
