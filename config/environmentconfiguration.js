const fs = require('fs');
const concat = require('concat-stream');
const toml = require('toml');
const _cfEnv = require("cfenv");
var _env, _config;

//Returns an environment object
function EnvironmentConfiguration(){

  		console.log('#########################################Configuration#################################################\n')

  if("undefined" === typeof _cfEnv){
    console.log("There is no environment object available.");
    process.exit();
  }

  var data = fs.readFileSync('./config/app.toml', 'utf8');

  if("undefined" === data){
    console.log("No config data returned");
    process.exit();
  }

  var parsed = toml.parse(data);

  if("undefined" === typeof parsed){
   console.log("Couldn't parse the toml file");
   proces.exit();
  }

    var vcap = _cfEnv.getAppEnv()
    var appName = vcap.name
    //TODO: Temp fix until we can get the CF environment variable for the space
    var spaceName = 'qa'//vcap.space_name

    console.log("Config object: " + _config);
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
    this.erviceName = parsed.qa.dbServiceName;

  };
module.exports = EnvironmentConfiguration;
