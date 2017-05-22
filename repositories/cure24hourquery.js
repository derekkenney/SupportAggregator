const todaysDate = require('../models/todaydate.js');
var _date;

function Cure24HourQuery() {
  console.log("CureQueryFor24Hours constructor");

  _date = new todaysDate();
  console.log("Date to be queiried");
}

//Add a property for the query

module.exports = Cure24HourQuery;
