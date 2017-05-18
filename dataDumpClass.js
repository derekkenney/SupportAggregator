/**
 *
 */
var destinationpath, querysql, sourcePath, sourceTableName, mongoInfo, dbCreds, dbInfo, envConf, collectionName;
var BeginOffSet, EndOffSet, envConfigData, cureConfigData, cdata;
var origination = 2;
var stack = new Error().stack;
var ecode = new Error().code;
var fs = require('fs');
var toml = require('toml-js');

function dataDumpClass(source, destination){

	this.source = source;
	this.destination = destination;

	console.log("Initialize the configuration data objects")
	envConfigData = getConfigData()
	cureConfigData = getCureConfigData()

	switch (source.toString().trim()){
	case 'Cure':
		console.log("In the cure case statement.")
		getCureConfig();
		sourceTableName = 'UWOpsTicketTracker';
		//this.sourceTableName = sourceTableName;
		origination = 1;
		break;

	case 'AD':
		// TODO AD config

	}

//TODO Refactor as a property of a MongoDB repo object. Switch statements are code smells
	switch (destination.toString().trim()){
	case 'csMongodb':
		//console.log('destinationpath: '+dbCreds);
		destinationpath = dbCreds;
	}

}

//This function gets the data from app.toml in config folder
function getConfigData(){

	console.log("Reading config data, and parsing into configdata var")

	try {
		var _configData = fs.readFileSync('config/app.toml');

		if("undefined" === typeof _configData){
			console.log("configdata is undefined. Exiting application.")
			process.exit()
		}
			return toml.parse(_configData);

	} catch (e) {
				console.log('There was an error getting the configuration data: ' + err.stack);
				process.exit()
	}
}

function getCureConfigData(){
	console.log("Entered getCureConfigData. Reading Cure data from a toml file.");

	try {
		var _configData = envConfigData['cure']

		console.log("Cure configuration data: " + _configData);
	}
	catch (err) {
		console.log('There was an error reading the cure configuration data. ' + err.stack);
		process.exit();
	}
}

function envVar(){
	console.log("Entered envVar(). Read environment variables from CloudFoundry");

	var cfEnv = require("cfenv");
	var appEnv = cfEnv.getAppEnv();

	if("undefined" === typeof appEnv || "undefined" === typeof cfEnv){
		console.log("Couldn't read the CloudFoundry app environment into a var. Exiting program.")
		process.exit()
	}

	console.log("Reading the space name from app environment variable")
	var spaceName = appEnv.space_name;

	cosole.log("Reading config data from toml file.")
	configdata = toml.parse(configdata);
	configdata = configdata[spaceName];
	dbInfo = configdata.uri;
	collectionName = configdata.collectionName;

	return dbInfo, collectionName;

}

//Function to send load to the destination
dataDumpClass.prototype.sendLoad = function(){

	envVar();


	console.log('Starting prototype sendload');

	//console.log('print dbInfo: '+dbInfo);

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

module.exports = dataDumpClass;
