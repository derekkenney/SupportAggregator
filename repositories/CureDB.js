var _config, _24hourQuery;
var conn = require('tedious').Connection;
const sql = require('mssql')
const TwentyFourHourQuery = require('./cure24hourquery.js');
const DateRangeQuery = require('./daterangequery.js');
const Today = require('../models/yesterday.js');
const StartDate = require('../models/startdate.js');
const EndDate = require('../models/enddate.js');

var _conn;

function CureRepository(config){
	try {
			console.log('Entered the CureRepository constructor');

			if("undefined" === typeof config){
				return new Error("Config object is null. Can't create an instance of the CureDB repo.")
			}
			_config = config;
	} catch (e) {
			return new Error("An error occurred in creating an instance of the CureRep class " + e)
	}
}

CureRepository.prototype.Get = function(options, callback) {
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
			port: _config.portF
		};

		sql.connect(config, err => {
				console.log("Creating a new request");
			 	const request = new sql.Request();
				//request.stream = true;

				console.log("Adding query to the request")
				request.stream = true;

				//Here we determine which query we want to use. Either the 24 hour, or date range
				if("undefined" === options.startDate || "undefined" === options.endDate){
					//create an instance of the 24 hour query
					//pass in the date dependency
					console.log("Calling 24 hour query");
					var today = new Today();
					var query = new TwentyFourHourQuery(today.today);

					request.query(query.query);
				}
				else{
					console.log("Calling date range query");
					//get formatted date objects
					var startDate = new StartDate(options.startDate);
					var endDate = new EndDate(options.endDate);
					var query = new DateRangeQuery(startDate.startDate, endDate.endDate);

					request.query(query.query);
				}

				request.on('done', () => {
						console.log("Request is done. Closing SQL connection");
						sql.close();
						console.log("rows: " + rows);
						callback(null, rows);
				});

				request.on('row', row => {
					var rowForInsert = {"CureID" : row.ID,  "SubmissionDate" : row.FO_SubmissionDate, "Severity" : row.FO_Severity , "ResolutionDate" : row.EndDate, "TimeStamp" : Date.now()}
					//Create a JSON object from JS object
					var json = rowForInsert
					rows.push(json)
				});

			 request.on('error', err => {
				 console.error("An error making a request to DB " + err)
				 callback(new Error("An error making a request to DB " + err), null)
			 });
		});

	sql.on('error', err => {
		console.error("An error occurred connecting to sql server " + err)
		callback(new Error("An error occurred connecting to sql server " + err), null)
	});
}
module.exports = CureRepository;
