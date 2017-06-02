var dateFormat = require('dateformat');
var dateTime = require('node-datetime');

function EndDate(endDate){
  console.log("Creating end date object");
  console.log("Constructor argument for end date: " + endDate);

  if('undefined' !== typeof endDate){
    this.endDate = dateFormat(endDate, "yyyy-mm-dd HH:MM:ss");
    console.log("End date: " + this.endDate);
  } else {
    this.endDate = 'undefined';
  }
}

module.exports = EndDate;
