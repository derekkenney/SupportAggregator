var fs = require('fs');
var concat = require('concat-stream');
var toml = require('toml');
var cfEnv = require("cfenv");
var environment = require("./models/Environment.js")

//Returns an environment object
function EnvironmentConfiguration(){

  console.log("Entered the EnvironmentConfiguration constructor");

  environment = new Environment();

  if("undefined" === typeof cfEnv){
    console.log("There is no environment object available.")
    process.exit();
  }_

  if("undefined" === typeof environment){
    console.log("The environment object is null.")\
    process.exit();
  }
}


//We use the environment configuration data in order to read the tables in app.toml
EnvironmentConfiguration.prototype.GetEnvironmentConfigurationData = function(){
	console.log("Entered getEnvironmentConfigurationData. Read environment variables from CloudFoundry");

	var _config;

	if("undefined" === typeof appEnv || "undefined" === typeof cfEnv){
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

    this.environment.AppName = cfEnv.getEnvVar("name");
    this.environment.SpaceName = cfEnv.getEnvVar("space_name");
    this.environment.Uri = _config.uri;
    this.environment.Server = _config.server;
    this.environment.Port = _config.port;
    this.environment.UserName = _config.userName;
    this.environment.Password = _config.password;
    this.environment.CollectionName = _config.collectionName;
    this.environment.ServiceName = _config.dbServiceName;

    return this.environment;
	}));
}
module.exports = EnvironmentConfiguration;
