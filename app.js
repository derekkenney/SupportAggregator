
console.log('Starting server');
var http = require('http');
var cureService = require('./cureservice.js');
var _cureService = new cureService();
var express = require('express');
const Yesterday = require('./models/yesterday.js')
const OptionalArguments = require('./repositories/optionalarguments.js')
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var app = express();

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'),  function(){
	console.log("Cure data API listening on port " + app.get('port'));
});

//Default
app.get('/', function(req, res){
	res.send('index');
})

//Gets the cure data for a date Range
app.get('/cure/:startdate/:enddate', function(req, res, next){
	console.log("Route for getting cure data by date range");
	next()
	}, function(req, res, next){
				var options = {startDate : req.params.startdate + " 00:00.000", endDate : req.params.enddate + " 00:00:000"}

				//we use an optional arguments object for determining which query object to use
				var optArgs = new OptionalArguments(options);

				_cureService.GetCureData(optArgs, function(err, result){
					if(err){
						res.status(500).send(err);
					}
					res.send(JSON.stringify(result));
				});
	});

//Gets the cure data for the previous day
app.get('/cure/yesterday', function(req, res, next){
	console.log("In route for yesterday data")
	next()
}, function(req, res, next){

		//Yesterday doesn't take any parameters from the request.
		//We create a new instance of the yesterday object, add it to the options,
		//and pass to the query.
		var yesterday = new Yesterday();
		var options = {yesterday : yesterday.yesterday}

		//we use an optional arguments object for determining which query object to use
		var optArgs = new OptionalArguments(options)

		_cureService.GetCureData(optArgs, function(err, result){
			if(err){
				res.status(500).send(err);
			}
			res.send(JSON.stringify(result));
		});
})

//Saves the Cure data from the previous day
app.post('/ticket', jsonParser, function(req, res){
	console.log("Route for posting cure data");

	if(!req.body) return res.sendStatus(400);

	_cureService.SaveCureData(req.body, function(err, result){

		if(err){
			console.error(err);
			res.status(500).send(err)
		}

		console.log("Mongo response:" + result)
		res.status(200).send(result)
	});
});

//Generic exception handling
app.use(function (err, req, res, next){
	console.error(err.stack);
	res.status(500).send('An error occurred');
})
