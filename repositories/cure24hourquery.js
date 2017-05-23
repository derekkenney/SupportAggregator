const queryDate = require('../models/queryDate.js');
const stringify = require('node-stringify');
var origination;


function Cure24HourQuery() {
  console.log("CureQueryFor24Hours constructor");

  _queryDate = new queryDate();
  console.log("Date to be queiried:" + _queryDate.today);

  //test date var to validate against known records
  var testDate = '2017-05-01 00:00:00.000';

  origination = 1;

 this.query = "SELECT ID, FO_OwnerUserID, FO_AckDate, FO_RemedyTicketNo, To_SubmitterName, TO_SubmitterEmail, TO_SubmitterContactNo," +
			"FO_SubmissionDate, FO_Severity, FO_Priority, UD_UserCompanyName, MD_SubmissionEmail, UD_UserLogonEmail," +
			"MD_DefectType FROM UWOpsTicketTracker WHERE FO_SubmissionDate = " +  stringify(testDate) + ";"

    //  console.log("query: " + this.query);
}

module.exports = Cure24HourQuery;
