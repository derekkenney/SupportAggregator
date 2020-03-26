const http = require('http');
const support = require('./support.js');
const express = require('express');
const Yesterday = require('./models/yesterday.js')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

var app = express();

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'),  function(){
	console.log("Support service is listening on port " + app.get('port'));
});

const responseHandler = (err, data) => {
	if (err) {
		res.status(500).send(err)
	}
	res.send(JSON.stringify(data))
}


// Route handler for retrieving support tickets within a start and end date
app.get('/api/support/:startdate/:enddate', async function(req, res) {
	const args = {startDate : req.params.startdate + " 00:00.000", endDate : req.params.enddate + " 00:00:000"}
	
	let tickets, err = support.getSupportTickets(args, responseHandler)

});

app.post('/cure/ticket', jsonParser, function(req, res){
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
