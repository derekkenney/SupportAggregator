

function CureRepository(configurationObject){

}


function Get(){
	try {
		console.log('Entering getDataFromCure');
		console.log("Verifying that we have the needed cure configuration values")

		var server = cureConfigData.server;
		console.log("DB server: " + server)

		var db = cureConfigData.database;
		console.log("Database:" + db)

		var port = cureConfigData.port
		console.log("Port: " + port)

		var userName = cureConfigData.userName;
		console.log("Username: " + userName);


	} catch (e) {

	}
}
