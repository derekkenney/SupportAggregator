var dateFormat = require('dateformat');
var dateTime = require('node-datetime');

function EndDate(endDate){
  console.log("Creating end date object");
  this.endDate = dateFormat(endDate, "yyyy-mm-dd HH:MM:ss");
  console.log("End date: " + this.endDate);
}

module.exports = EndDate;
