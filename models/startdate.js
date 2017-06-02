var dateFormat = require('dateformat');
var dateTime = require('node-datetime');

function StartDate(startDate){
  console.log("Creating start date object");
  console.log("Constructor argument for start date: " + startDate);

  if('undefined' !== typeof startDate){
    this.startDate = dateFormat(startDate, "yyyy-mm-dd HH:MM:ss");
    console.log("Start date: " + this.startDate);
  } else {
    this.startDate = 'undefined';
  }
}

module.exports = StartDate;
