const dateTime = require('node-datetime');


function TodaysDate(){
  console.log("Creating date range object");
  var dt = dateTime.create();
  this.today = dt.format('m-d-y');

  console.log("Today: " + this.today);
}

module.exports = TodaysDate;
