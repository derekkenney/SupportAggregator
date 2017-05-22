var _config, _24hourQuery;
var conn = require('tedious').Connection;
const request = require('tedious').Request;
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
			server: _config.server,

			options: {port: _config.port, dbname: _config.db}
		};

		_conn = new conn(config);

		_conn.on('connect', function(err) {
			//create instance of the sql query object
			if(err){
				console.log("An error has occurred making a db connection. " + err);
				process.exit();
			}

			console.log("Database connection made");
			var data = getCureData();

			return data;
		});

	} catch (e) {
		console.log("An exception has occurred: " + e);
		process.exit();
	}
};

	function getCureData() {
			var _rows = {};
			var _request = new request(_TwentyFourHourQuery.query, function(err, rowCount, rows) {
						if (err) {
							console.log('Error getting 24 hour data: ' + err.stack);
						}
						else {
							console.log("Row count: " + rowCount);
						}
				});

				_request.on('row', function(columns) {
		      columns.forEach(function(column) {
		        console.log(column.metadata.colName + " : " + column.value);
		      });
		    });


		 // In SQL Server 2000 you may need: connection.execSqlBatch(request);
		 _conn.execSql(_request);
		 _conn.close();
		}

module.exports = CureRepository;
