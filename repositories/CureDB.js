var _config, _24hourQuery;
var conn = require('tedious').Connection;
var request = require('tedious').Request;
const 24hourquery = require('./cure24hourquery.js');

function CureRepository(config){
	console.log('Entered the CureRepository constructor');

	if("undefined" === typeof config){
		console.console.log("Config object is null. Can't create an instance of the CureDB repo.");
		process.exit();
	}
	_24hourQuery = new 24hourquery();
	_config = config;
}


function Get(){
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

		var _conn = new connection(config);

		_conn.on('connect', function(err){
			//create instance of the sql query object
			var query =
			var data = getCureData();
			return data;
		})

	} catch (e) {
		console.log("An exception has occurred: " + e);
		process.exit();
		}

	function getCureData(){

		//TODO create an instance of the cure query object

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
	}
}

module.exports = CureRepository;
