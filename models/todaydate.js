var dateTime = require('node-datetime');
var dt = dateTime.create();
var presentDate = dt.format('m-d-Y');

function TodaysDate(){
  console.log("Todays date object created: " + presentDate);
}

module.exports = TodaysDate;
