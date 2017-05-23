var _config, _24hourQuery;
var conn = require('tedious').Connection;
const sql = require('mssql')
const TwentyFourHourQuery = require('./cure24hourquery.js');
var _TwentyFourHourQuery, _conn;

function CureRepository(config){
	console.log('Entered the CureRepository constructor');

	if("undefined" === typeof config){
		console.console.log("Config object is null. Can't create an instance of the CureDB repo.");
		process.exit();
	}
	_TwentyFourHourQuery = new TwentyFourHourQuery();
	_config = config;
}


CureRepository.prototype.Get = function() {
		console.log('Entering getDataFromCure');
		console.log("Verifying that we have the needed cure configuration values");
		console.log("DB server: " + _config.server);
		console.log("Database:" + _config.db);
		console.log("Port: " + _config.port);
		console.log("Username: " + _config.userName);

		var rows = [];

		var config = {
			user: _config.userName,
			password: _config.password,
			server: _config.server,
			database: _config.db,
			port: _config.port
		};

		sql.connect(config, err => {
			if(err){
				console.log("An error occurred connecting to sql server " + err);
			}

			console.log("Creating a new request");
			const request = new sql.Request()
			//request.stream = true;

			console.log("Adding query to the request")
			request.query(_TwentyFourHourQuery.query, (err, result) => {
					for(var i = 0; i < result.recordsets[0].length; i++){
						console.log("ID:" + result.recordsets[0][i].ID)
					}
			});
		});

		sql.on('error', err => {
    		if(err) {
					console.log("An error occurred: " + err)
				}
		})
}
module.exports = CureRepository;
