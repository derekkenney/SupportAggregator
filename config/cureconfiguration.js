var cfEnv = require("cfenv");
var _data;

function CureConfiguration() {
  console.log('#########################################SQL DB Configuration#################################################\n')

  var fs = require('fs');
  var toml = require('toml-js');

   var data = fs.readFileSync('./config/app.toml', 'utf8');

   if("undefined" === data){
     console.log("No config data returned");

     return new Error("No config data");
   }

   var parsed = toml.parse(data);

    if("undefined" === typeof parsed){
      console.log("Couldn't parse the toml file");

      return new Error("Can't parse the configuration file");
    }

    console.log("Parsed the DB config values from config file.");

    this.server = parsed.cure.server;
    this.port = parsed.cure.port;
    this.userName = parsed.cure.userName;
    this.password = parsed.cure.password;
    this.db = parsed.cure.database;
}
module.exports = CureConfiguration;
