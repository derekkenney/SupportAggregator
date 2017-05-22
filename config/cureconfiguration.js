var cfEnv = require("cfenv");
var _data;

function CureConfiguration() {
  console.log("Entered Cure config constructor");
  var fs = require('fs');
  var toml = require('toml-js');

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

this.server = parsed.cure.server;
this.port = parsed.cure.port;
this.userName = parsed.cure.userName;
this.password = parsed.cure.password;
this.db = parsed.cure.database;
}
module.exports = CureConfiguration;
