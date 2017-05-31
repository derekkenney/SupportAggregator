const fs = require('fs');
const concat = require('concat-stream');
const toml = require('toml');
const _cfEnv = require("cfenv");
var _env, _config;

//Returns an environment object
function EnvironmentConfiguration(){

  		console.log('#########################################Environment Configuration#################################################\n')

  if("undefined" === typeof _cfEnv){
    console.error("There is no environment object available.");

    return new Error("There is no environment object available.")
  }

  var data = fs.readFileSync('./config/app.toml', 'utf8');

  if("undefined" === data){
    console.error("No config data returned");

    return new Error("No config data returned");
  }

  var parsed = toml.parse(data);

  if("undefined" === typeof parsed){
   console.error("Couldn't parse the toml file");

   return new Error("Couldn't parse the config file");
  }

    var vcap = _cfEnv.getAppEnv()
    var appName = vcap.name
    //TODO: Temp fix until we can get the CF environment variable for the space
    var spaceName = 'qa'//vcap.space_name

    console.log("Populating the environment object");
    console.log("Application name: " + appName);
    console.log("Space name: " + spaceName);
    console.log("Collection name read from passed in config object: "+ parsed.qa.collectionName)

    this.appName = appName
    this.spaceName = spaceName
    this.uri = parsed.qa.uri;
    this.server = parsed.qa.server;
    this.port = parsed.qa.port;
    this.userName = parsed.qa.userName;
    this.password = parsed.qa.password;
    this.collectionName = parsed.qa.collectionName;
    this.serviceName = parsed.qa.dbServiceName;

  };
module.exports = EnvironmentConfiguration;
