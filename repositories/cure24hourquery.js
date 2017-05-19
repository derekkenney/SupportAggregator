const todaysDate = require('../models/todaydate.js');
var _date;

function CureQueryFor24Hours{
  console.log("CureQueryFor24Hours constructor");

  _date = new todaysDate();
  console.log("Date to be queiried");
}

//Add a property for the query

module.export = CureQueryFor24Hours;
