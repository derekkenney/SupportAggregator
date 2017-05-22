/**
 *
 */
var destinationpath, querysql, sourcePath, sourceTableName, mongoInfo, dbCreds, dbInfo, collectionName;
var BeginOffSet, EndOffSet, envConfigData, cureConfigData, cdata, appEnv;
var origination = 2;
var stack = new Error().stack;
var ecode = new Error().code;
const fs = require('fs');
const cureDBRepo = require("./repositories/CureDB.js");
const cureMongoDbRepo = require("./repositories/CureMongoDB.js");
const cfEnv = require('cfenv');
const envConf = require('./config/environmentconfiguration.js');
const cureConf = require('./config/cureconfiguration.js');
var _cureDBRepo, _cureMongoDBRepo;

function CureService(){
	console.log("Entered CureService constructor.");
	console.log("Initialize objects");

	//Cure configuration variable
	var _cureConfig = new cureConf();

	//MongoDB and environment configuration variable
	var _envConfig = new envConf();

	//create repo objects to be used in the service. pass config objects into constructor
	_cureDBRepo = new cureDBRepo(_cureConfig);
	_cureMongoDBRepo = new cureMongoDbRepo(_envConfig);
}

CureService.prototype.GetCureData = function() {
	console.log("Getting Cure data.");

	return _cureDBRepo.Get();
}

CureService.prototype.SaveCureData = function() {
	console.log("Saving imported cure data.")
}

/*
	//Create a connection to Mongodb
	var MongoClient = require('mongodb').MongoClient
	, format = require('util').format;
	MongoClient.connect(dbInfo, function(err, db) {
		if (err) throw err.stack;
		console.log("Connected to Mongodb");

		//Switch case to sent the load to the correct loaction. 0 is for AD and 1 for Cure
		switch(origination){

		case 0:
			//TODO code for AD
			break;

		case 1:
			//create two variables for the query to run from the today -2 to today -1
			//var DateOffset = fs.readFileSync('config/Dateoffset.toml');
			//console.log('data: \n'+DateOffset);
			//DateOffset = toml.parse(DateOffset);
			var DateOffset = 'DateOffset';
			var BeginDayOffSet = 'BeginDayOffSet';
			var EndDayOffSet = 'EndDayOffSet';
			BeginOffSet = this.configdata[DateOffset];
			console.log('beginOffset: \n'+BeginOffSet);
			BeginOffSet = BeginOffSet.BeginDayOffSet;
			BeginOffSet = BeginOffSet;
			EndOffSet = this.configdata[DateOffset];
			EndOffSet = EndOffSet[EndDayOffSet];
			EndOffSet = EndOffSet;
			console.log('Begin: '+BeginOffSet);
			console.log('End: '+EndOffSet);

			var dateTime = require('node-datetime');
			var dt = dateTime.create();
			var presentDate = dt.format('m-d-Y');
			console.log(presentDate);
			dt.offsetInDays(BeginOffSet);
			var queryBeginDate = dt.format('m-d-Y');
			dt.offsetInDays(EndOffSet);
			var queryEndDate = dt.format('m-d-Y');
			console.log(queryEndDate);
			console.log(queryBeginDate);

			querysql="SELECT ID, FO_OwnerUserID,  FO_AckDate, FO_RemedyTicketNo, To_SubmitterName, TO_SubmitterEmail, TO_SubmitterContactNo," +
			"FO_SubmissionDate, FO_Severity, FO_Priority, UD_UserCompanyName, MD_SubmissionEmail, UD_UserLogonEmail," +
			"MD_DefectType, UC_ContactName, UC_ContactEmail, UC_BestTimeToContact, UC_UserContactNo, UC_PermissionToAccess," +
			" ID_Product, ID_TypeOfIssue, ID_OS, ID_Browser, ID_FoundThroghSSR, ID_SRREmail, ID_IssueSummary, MD_SaleAmount, " +
			"ID_StepsToReproduce, ID_Comment, MD_SLA, MD_Status, MD_NotifySLA, MD_Outlier, MD_CustImpact"
			+ " from " + sourceTableName + " where FO_SubmissionDate between '" + queryBeginDate + "' AND '" + queryEndDate + "'";

			//Connection to SQL with tedious
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
				console.log('inserting data into MongDB with option');
				//console.log('rows length: '+rows.lenght);

				var col = db.collection(collectionName);
				var batch = col.initializeUnorderedBulkOp({useLegacyOps: true});
				var a = 0;
				console.log("# of rows: "+rows.length);
				while (a < rows.length){

					//console.log('inside while loop. This is the a: '+a+'/n this is the value at a: '+JSON.stringify(rows[a]));
					batch.insert(rows[a])
					a++;
				}
				batch.execute(function(err, records) {
					if (err) throw err.stack;
					console.log('Successfully added '+rows.length+' records');
				});


			}

			//function to get SQL data
			function getSqlData() {
				//console.log('Getting data from SQL:\n'+querysql);
				request = new Request(querysql,
						function(err, rowCount, rows) {
					if (err) {
						console.log('error on Getting data from SQL: '+err.stack);
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
*/
module.exports = CureService;
