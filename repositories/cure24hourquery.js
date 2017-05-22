const queryDate = require('../models/queryDate.js');
var _date, sourceTable, origination, query;

function Cure24HourQuery() {
  console.log("CureQueryFor24Hours constructor");

  _queryDate = new queryDate();
  console.log("Date to be queiried:" + _queryDate.today);

  origination = 1;

 this.query = "SELECT ID, FO_OwnerUserID,  FO_AckDate, FO_RemedyTicketNo, To_SubmitterName, TO_SubmitterEmail, TO_SubmitterContactNo," +
			"FO_SubmissionDate, FO_Severity, FO_Priority, UD_UserCompanyName, MD_SubmissionEmail, UD_UserLogonEmail," +
			"MD_DefectType FROM UWOpsTicketTracker WHERE FO_SubmissionDate = '" + _queryDate.today + "';"
}

//Add a property for the query

module.exports = Cure24HourQuery;
