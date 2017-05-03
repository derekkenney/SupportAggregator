/**
 * 
 */
var destinationpath;
var sourcePath, sourceTableName;
var origination = 2;
var stack = new Error().stack;
var ecode = new Error().code;

function dataDumpClass(source, destination){
	this.source = source;
	this.destination = destination;

	switch (source.toString().trim()){
	case 'Cure':
		getCureConfig()
		sourceTableName = 'UWOpsTicketTracker';
		origination = 1
		break;

	case 'AD':
		// TODO read from config file
		console.log("This is AD");
		sourcePath='mongodb://127.0.0.1:27017/video';
		origination = 0
		console.log('0.b-the '+sourcePath+' and '+destinationpath);

	}
	console.log('1-the '+sourcePath+' and '+destinationpath);

	switch (destination.toString().trim()){
	case 'csMongodb':
		destinationpath='mongodb://127.0.0.1:27017/restaurants';

	}

	console.log('2-the '+sourcePath+' and '+destinationpath);
}

//function to set sourcePath for cure
function getCureConfig(){

	fs = require("fs");
	var filename = "./secret-cure-config.json";
	console.log("This is Cure");
	try {
		sourcePath = require(filename);
	}
	catch (err) {
		config={};
		console.log('getCureConfig function '+err.stack);
		process.exit();
	}

}




//Function to send load to the destination
dataDumpClass.prototype.sendLoad = function(){

	//Create a connection to Mongodb
	var MongoClient = require('mongodb').MongoClient
	, format = require('util').format;
	MongoClient.connect(destinationpath, function(err, db) {
		if (err) throw err.stack;
		console.log("Connected to Mongodb");

		//Switch case to sent the load to the correct loaction. 0 is for AD and 1 for Cure	  
		switch(origination){

		case 0:
			console.log('3-the '+sourcePath+' and '+destinationpath);
			var datapumps = require('datapumps'),
			Pump = datapumps.Pump,
			MongodbMixin = datapumps.mixin.MongodbMixin,
			ExcelWriterMixin = datapumps.mixin.ExcelWriterMixin,
			pump = new Pump();
			console.log('MongodbMixin');
			pump
			.mixin(MongodbMixin(sourcePath.toString().trim()))
			.useCollection('restaurants')
			.from(pump.find({}))
			.mixin(ExcelWriterMixin())
			.createWorkbook(destinationpath.toString().trim())
			.createWorksheet('Restaurants')
			.process(function(restaurants) {
				return pump.writeRow([ restaurants.country, restaurants.name, restaurants.Age, restaurants.attribute ]);
				console.log('After MongodbMixin');
			})
			.logErrorsToConsole()
			.run()
			.then(function() {
				console.log("Done writing contacts to file");
			});
			break;

		case 1:
			//create two variables for the query to run from the today -2 to today -1
			var dateTime = require('node-datetime');
			var dt = dateTime.create();
			var presentDate = dt.format('m-d-Y');
			console.log(presentDate);
			dt.offsetInDays(-1);
			var queryBeginDate = dt.format('m-d-Y'); 
			//dt.offsetInDays(-1);
			var queryEndDate = dt.format('m-d-Y');
			//console.log(queryEndDate);
			//console.log(queryBeginDate);
			//queryBeginDate = queryBeginDate.toString();
			//queryEndDate = queryEndDate.toString();

			//sourceTableName = sourceTableName.toString();
			//sql query
			var querysql = "SELECT ID, FO_OwnerUserID,  FO_AckDate, FO_RemedyTicketNo, To_SubmitterName, TO_SubmitterEmail, TO_SubmitterContactNo," +
			"FO_SubmissionDate, FO_Severity, FO_Priority, UD_UserCompanyName, MD_SubmissionEmail, UD_UserLogonEmail," +
			"MD_DefectType, UC_ContactName, UC_ContactEmail, UC_BestTimeToContact, UC_UserContactNo, UC_PermissionToAccess," +
			" ID_Product, ID_TypeOfIssue, ID_OS, ID_Browser, ID_FoundThroghSSR, ID_SRREmail, ID_IssueSummary, MD_SaleAmount, " +
			"ID_StepsToReproduce, ID_Comment, MD_SLA, MD_Status, MD_NotifySLA, MD_Outlier, MD_CustImpact"
			+ " from " + sourceTableName + " where FO_SubmissionDate between '" + queryBeginDate + "' AND '" + queryEndDate + "'";
			//querysql = querysql.toString();
			//console.log("query is: "+querysql);
			var Connection = require('tedious').Connection;
			var rows = [];


			// Creating the SQL connection then call the getSqlData function to grab the data
			var connection = new Connection(sourcePath);
			connection.on('connect', function(err) {
				if (err) throw err.stack;
				console.log('Connection successful. executing the getSqlData function to query and store the result');
				getSqlData();
			}		
			);
			//connection.close();

			var Request = require('tedious').Request;

			function insertIntoMongoDb(){
				console.log('inserting data into MongDB');
				//console.log('rows length: '+rows.lenght);

				db.collection('restaurants').insert(rows, function(err, records) {
					if (err) throw err.stack;
					console.log('Successfully added '+rows.length+' records');
				});

			}

			function getSqlData() {
				console.log('Getting data from SQL');
				request = new Request(querysql,
						function(err, rowCount, rows) {
					if (err) {
						console.log(err.stack);
					} else {
						//console.log('the result is: '+rows);
						insertIntoMongoDb();
					}
				});
				request.on('row', function(columns) {
					var row = {};
					columns.forEach(function(column) {
						row[column.metadata.colName] = column.value;
					});

					rows.push(row);
				});

				connection.execSql(request);
			}

		}

	});

}

module.exports = dataDumpClass;