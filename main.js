
console.log('Starting server');
var http = require('http');
var cureService = require('./cureservice.js');
var _cureService = new cureService();
var express = require('express');
var app = express();
var optionalArguments = require('./repositories/optionalarguments.js')

app.listen(8080, function(){
	console.log("Cure data API listening on 3000");
})

//Routes
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
				var dateArguments = new optionalArguments(options)

				if("undefined" === startDate || "undefined" === endDate){
					next('route');
				}


	}
});


//Gets the cure data for the previous day
app.get('/cure/yesterday', function(req, res, next){
	console.log("Route for GET making call to service layer for date " + req.params.date);
	next()
}, function(req, res, next){

	_cureService.GetCureData(function(err, result){

		if(err){
			console.error(err.stack);
			res.status(500).send('An error occurred');
		}
		res.send(JSON.stringify(result));
	});
})

//Saves the Cure data from the previous day
app.post('/cure/yesterday', function(req, res, next){
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
