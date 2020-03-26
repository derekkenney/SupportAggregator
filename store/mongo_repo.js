const conn = require('tedious').Connection;
const sql = require('mssql')
const stringify = require("stringify")
var _conn, query;

process.env.port = 3000

console.log(process.env.port)


// Locally scoped config object. Properties set from environment variables
let config = {
	user: "",
	password: "",
	server: process.env.hostname,
	database: "",
	port: 3000,
	pool: {
		max: 20,
		min: 0,
		idleTimeoutMillis: 30000
	}
}





const getTickets = (startDate, endDate) => {
		var rows = [];

		if("undefined" !== typeof startDate && "undefined" !== typeof endDate){
			console.log("Creating date range query");
			//get formatted date objects
			this.query = "SELECT ID, FO_OwnerUserID, FO_AckDate, FO_RemedyTicketNo, To_SubmitterName, TO_SubmitterEmail, TO_SubmitterContactNo, EndDate, " +
                        "FO_SubmissionDate, FO_Severity, FO_Priority, UD_UserCompanyName, MD_SubmissionEmail, UD_UserLogonEmail, MD_DefectType, ID_Product, ID_TypeOfIssue, MD_SLA " +
      "FROM UWOpsTicketTracker LEFT JOIN UWTicketStatus " +
      "ON UWOpsTicketTracker.ID = UWTicketStatus.CureID " +
      "WHERE FO_SubmissionDate BETWEEN " +  stringify(startDate) + " AND " + stringify(endDate) + ";"
}


		const pool = new sql.ConnectionPool(config, err => {

				if(err){
					console.error("An error occurred connecting to sql server " + err)
				}

				console.log("Adding query to the request")

				const request = new sql.Request(pool);
				request.stream = true;

				request.query(query);

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
module.exports = {
	getTickets: getTickets
}

