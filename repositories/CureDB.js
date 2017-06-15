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
			port: _config.port,
			pool: {
        max: 20,
        min: 0,
        idleTimeoutMillis: 30000
    	}
		};

		//TODO: Refactor into more granular repo classes. From the request, we should know which repo instance to use
		//The if statements below are a code smell
		//Here we determine which query we want to use. Either the 24 hour, or date range
		if("undefined" !== typeof optArgs.yesterday){
			//create an instance of the 24 hour query
			//pass in the date dependency
			console.log("Creating yesterday query");
			query = new TwentyFourHourQuery(optArgs.yesterday);
		}

		if("undefined" !== typeof optArgs.startDate && "undefined" !== typeof optArgs.endDate){
			console.log("Creating date range query");
			//get formatted date objects
			var startDate = new StartDate(optArgs.startDate);
			var endDate = new EndDate(optArgs.endDate);
			query = new DateRangeQuery(startDate.startDate, endDate.endDate);
		}

		const pool = new sql.ConnectionPool(config, err => {

				if(err){
					console.error("An error occurred connecting to sql server " + err)
					callback(new Error("An error occurred connecting to sql server " + err), null)
				}

				console.log("Adding query to the request")

				const request = new sql.Request(pool);
				request.stream = true;

				request.query(query.query);

				request.on('done', () => {
						console.log("Request is done. Closing SQL connection");
						console.log("rows: " + rows);
						pool.close();
						callback(null, rows);
				});

				request.on('row', row => {
					//Modify to save more of the results
					var rowForInsert = {"CureID" : row.ID,
					"SubmissionDate" : row.FO_SubmissionDate,
					"Severity" : row.FO_Severity,
					"ResolutionDate" : row.EndDate,
					"TimeStamp" : Date.now(),
					"RemedyTicketNo" : row.FO_RemedyTicketNo,
					"SubmitterName" : row.To_SubmitterName,
					"DefectType" : row.MD_DefectType,
					"Product" : row.ID_Product,
					"TypeOfIssue" : row.ID_TypeOfIssue,
					"SLA" : row.MD_SLA
				}
					//Create a JSON object from JS object
					var json = rowForInsert
					rows.push(json)
				});

			 request.on('error', err => {
				 console.error("An error making a request to DB " + err)
				 pool.close();
				 callback(new Error("An error making a request to DB " + err), null)
			 });
		});

	pool.on('error', err => {
		console.error("An error occurred " + err)
		pool.close();
		callback(new Error("An error occurred " + err), null)
	});


}
module.exports = CureRepository;
