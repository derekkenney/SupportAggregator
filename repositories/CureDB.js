var _config, _24hourQuery;
var conn = require('tedious').Connection;
const sql = require('mssql')
const TwentyFourHourQuery = require('./cure24hourquery.js');
const DateRangeQuery = require('./daterangequery.js');
const Yesterday = require('../models/yesterday.js');
const StartDate = require('../models/startdate.js');
const EndDate = require('../models/enddate.js');

var _conn, query;

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

CureRepository.prototype.Get = function(optArgs, callback) {
		console.log('Entering getDataFromCure');
		console.log("Verifying that we have the needed cure configuration values");
		console.log("DB server: " + _config.server);
		console.log("Database:" + _config.db);
		console.log("Port: " + _config.port);
		console.log("Username: " + _config.userName);
		console.log("Start date: " + optArgs.startDate);
		console.log("End date: " + optArgs.endDate);
		console.log("Yesterday: " + optArgs.yesterday)

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
					console.error("An error occurred connecting to sql server " + err)
					callback(new Error("An error occurred connecting to sql server " + err), null)
				}

				//Here we determine which query we want to use. Either the 24 hour, or date range
				if('undefined' !== typeof optArgs.yesterday){
					//create an instance of the 24 hour query
					//pass in the date dependency
					console.log("Calling 24 hour query");
					console.log("Yesterday before creating query: " + optArgs.yesterday);

					query = new TwentyFourHourQuery(optArgs.yesterday);
				}

				if('undefined' !== typeof optArgs.startDate && 'undefined' !== typeof optArgs.endDate){
					console.log("Calling date range query");
					//get formatted date objects
					var startDate = new StartDate(optArgs.startDate);
					var endDate = new EndDate(optArgs.endDate);
					query = new DateRangeQuery(startDate.startDate, endDate.endDate);
				}

				console.log("Adding query to the request")

				const request = new sql.Request();
				request.stream = true;
				request.query(query.query);

				request.on('done', () => {
						console.log("Request is done. Closing SQL connection");
						sql.close();
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
		console.error("An error occurred " + err)
		callback(new Error("An error occurred " + err), null)
	});
}
module.exports = CureRepository;
