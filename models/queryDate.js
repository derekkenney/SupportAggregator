var dateFormat = require('dateformat');
var dateTime = require('node-datetime');

function TodaysDate(){
  console.log("Creating date range object");
  var now = new Date();
  var yesterday = now.setDate(now.getDate() - 1);
  this.today = dateFormat(yesterday, "fullDate");

  console.log("Today: " + this.today);
}

module.exports = TodaysDate;
