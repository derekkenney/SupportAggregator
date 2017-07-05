const fs = require('fs');
const concat = require('concat-stream');
const toml = require('toml');
const cfEnv = require("cfenv");
var _env, _config;

//Returns an environment object
function EnvironmentConfiguration(){

  		console.log('#########################################Environment Configuration#################################################\n')

  if("undefined" === typeof cfEnv){
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

    var appEnv = cfEnv.getAppEnv()

    var spaceName = appEnv.app.space_name

    console.log("Populating the environment object");
    console.log("Application name: " + appEnv.name);
    console.log("Space name: " + spaceName)

    this.appName = appEnv.name
    this.spaceName = spaceName

    if(spaceName === 'qa'){
        console.log("QA")
        this.uri = parsed.qa.uri;
        this.server = parsed.qa.server;
        this.port = parsed.qa.port;
        this.userName = parsed.qa.userName;
        this.password = parsed.qa.password;
        this.collectionName = parsed.qa.collectionName;
        this.serviceName = parsed.qa.dbServiceName;
    }

    if(spaceName === 'prod'){
        console.log("Prod")
        this.uri = parsed.prod.uri;
        this.server = parsed.prod.server;
        this.port = parsed.prod.port;
        this.userName = parsed.prod.userName;
        this.password = parsed.qa.password;
        this.collectionName = parsed.prod.collectionName;
        this.serviceName = parsed.prod.dbServiceName;
    }
  };
module.exports = EnvironmentConfiguration;
