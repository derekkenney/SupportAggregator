
console.log('Starting server');
var http = require('http');
var cureService = require('./cureservice.js');
var _cureService = new cureService();
var express = require('express');
var app = express();
const Yesterday = require('./models/yesterday.js')
const OptionalArguments = require('./repositories/optionalarguments.js')

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
				var options = {startDate : req.params.startdate, endDate : req.params.enddate}

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

		//add yesterday to the options object
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
app.post('/cure/yesterday', function(req, res, next){
		console.log("Route for posting cure data");
	next()
}, function(req, res, next){
		_cureService.SaveCureData(cureData, function(err, result){
		console.log("Mongo response:" + result)
		res.send(result);
		next();
		})
});

//Generic exception handling
app.use(function (err, req, res, next){
	console.error(err.stack);
	res.status(500).send('An error occurred');
})
