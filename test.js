var qa,dbInfo;
function envVar(){
	console.log("Getting env var");
	var cfEnv = require("cfenv");
	console.log("Getting env var- Now get app env");
	var appEnv = cfEnv.getAppEnv();
	console.log(appEnv);
	//appEnv = JSON.parse(appEnv);
	var mongoInfo = appEnv.app;
	mongoInfo = JSON.stringify(mongoInfo);
	console.log(mongoInfo);
	mongoInfo = JSON.parse(mongoInfo);
	console.log(mongoInfo);
	mongoInfo = mongoInfo.space_name;
	console.log(mongoInfo);
	qa = 'qa';
	return qa;
}

var stack = new Error().stack;
var ecode = new Error().code;

function getCreds(){
	envConf = envVar();
	console.log('envVConf: '+envConf);
	var fs = require('fs');
	var toml = require('toml-js');

	fs.readFile('config/app.toml', function (err, data) {
		if (err) throw err.stack;
		dbInfo = toml.parse(data);
		dbInfo = dbInfo[envConf];
		dbInfo = dbInfo.uri;
		console.log('parsed the uri: '+dbInfo);
		/*dbInfo = JSON.stringify(dbInfo);
		dbInfo = JSON.parse(dbInfo);
		console.log('print dbInfo: '+dbInfo);
		dbInfo = dbInfo[uri];*/
		return dbInfo;
	});
	console.log('dbInfo: '+dbInfo);

}

getCreds();
