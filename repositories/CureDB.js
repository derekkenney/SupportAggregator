var _config, _24hourQuery;
var conn = require('tedious').Connection;
var request = require('tedious').Request;
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


CureRepository.prototype.Get =  function() {
	try {
		console.log('Entering getDataFromCure');
		console.log("Verifying that we have the needed cure configuration values");
		console.log("DB server: " + _config.server);
		console.log("Database:" + _config.db);
		console.log("Port: " + _config.port);
		console.log("Username: " + _config.userName);

		//create the connection to SQL Server
		//Connection to SQL with tedious
		var config = {
			userName: _config.userName,
			password: _config.password,
			server: _config.server
		};

		_conn = new connection(config);

		_conn.on('connect', function(err) {
			//create instance of the sql query object
			var data = getCureData();

			return data;
		});

	} catch (e) {
		console.log("An exception has occurred: " + e);
		process.exit();
	}
};

	function getCureData() {
			request = new Request(_TwentyFourHourQuery,
					function(err, rowCount, rows) {
						if (err) {
							console.log('Error getting 24 hour data: ' + err.stack);
						}
						else {
							console.log("Row count: " + rowCount);
						}

						_conn.close();
				});

				//Work on request object
				request.on('row', function(columns) {
				 columns.forEach(function(column) {
					 if (column.value === null) {
						 console.log('NULL');
					 } else {
						 rows.push[column.value];
					 }
				 });
			 });

			 request.on('done', function(rowCount, more) {
				 console.log(rowCount + ' rows returned');
			 });

			 // In SQL Server 2000 you may need: connection.execSqlBatch(request);
			 _conn.execSql(request);
			}

module.exports = CureRepository;
