var dateFormat = require('dateformat');
var dateTime = require('node-datetime');

function Yesterday(){
  var dt = dateTime.create();
  dt.offsetInDays(-1);
  this.yesterday = dt.format('Y-m-d 00:00:00.000');

  console.log("Yesterday: " + this.yesterday);
}

module.exports = Yesterday;
