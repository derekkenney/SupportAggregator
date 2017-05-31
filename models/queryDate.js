var dateFormat = require('dateformat');
var dateTime = require('node-datetime');

function TodaysDate(){
  console.log("Creating date range object");
  var dt = dateTime.create();
  dt.offsetInDays(-1);
  this.today = dt.format('Y-m-d 00:00:00.000');

  console.log("Today: " + this.today);
}

function StartDate(startDate){
  this.startDate = dateFormat(startDate, "isoDateTime");
}

function EndDate(endDate){
  this.endDate = dateFormat(endDate, "isoDateTime");
}

module.exports = TodaysDate;
module.exports = StartDate;
module.exports = EndDate;
