var dateFormat = require('dateformat');
var dateTime = require('node-datetime');

function TodaysDate(){
  console.log("Creating date range object");
  var dt = dateTime.create();
  dt.offsetInDays(-1);
  this.today = dt.format('Y-m-d 00:00:00.000');

  console.log("Today: " + this.today);
}

module.exports = TodaysDate;
