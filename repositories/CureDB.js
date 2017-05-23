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


CureRepository.prototype.Get = function(callback) {
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
			request.stream = true;

			request.query(_TwentyFourHourQuery.query)

			request.on('done', () => {
					console.log("Request is done. Closing SQL connection")
					sql.close()
					console.log(rows)
					callback(rows)
			})

			request.on('row', row => {
				console.log(row)
				var rowForInsert = "{ID:'" + row.ID + "', Submission Date:'" + row.FO_SubmissionDate + "', Severity:'" + row.FO_Severity + "', ResolutionDate:'" + row.EndDate + "'}"

				console.log("Row to be inserted: " + rowForInsert)
				rows.push(rowForInsert)
			})

			 request.on('error', err => {
				 console.log("An error occurred executing the query " + err)
				 callback(err)
			 })
		});

		sql.on('error', err => {
    		if(err) {
					console.log("An error occurred: " + err)
					process.exit();
				}
		})
}
module.exports = CureRepository;
