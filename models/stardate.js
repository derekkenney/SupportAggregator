var dateFormat = require('dateformat');
var dateTime = require('node-datetime');

function StartDate(startDate){
  console.log("Creating start date object");
  this.startDate = dateFormat(startDate, "yyyy-mm-dd HH:MM:ss");
  console.log("Start date: " + this.startDate);
}

module.exports = StartDate;
