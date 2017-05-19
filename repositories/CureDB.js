var _config;

function CureRepository(config){
	console.log('Entered the CureRepository constructor');

	if("undefined" === typeof config){
		console.console.log("Config object is null. Can't create an instance of the CureDB repo.");
		process.exit();
	}

	_config = config;
}


function Get(){
	try {
		console.log('Entering getDataFromCure');
		console.log("Verifying that we have the needed cure configuration values");
		console.log("DB server: " + _config.server);
		console.log("Database:" + _config.db);
		console.log("Port: " + _config.port);
		console.log("Username: " + _config.userName);
	} catch (e) {
		console.log("An exception has occurred: " + e);
		process.exit();
		}
}
