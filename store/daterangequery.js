const queryDate = require('../models/queryDate.js');
const stringify = require('node-stringify');
var origination;

//TODO Replace this class with a proc once I have access to do so in SQL Server
function DateRangeQuery(startDate, endDate) {
  console.log("DateRangeQuery constructor");
  console.log("Start date: " + startDate);
  console.log("End date: " + endDate);
  this.query = "SELECT ID, FO_OwnerUserID, FO_AckDate, FO_RemedyTicketNo, To_SubmitterName, TO_SubmitterEmail, TO_SubmitterContactNo, EndDate, " +
			"FO_SubmissionDate, FO_Severity, FO_Priority, UD_UserCompanyName, MD_SubmissionEmail, UD_UserLogonEmail, MD_DefectType, ID_Product, ID_TypeOfIssue, MD_SLA " +
      "FROM UWOpsTicketTracker LEFT JOIN UWTicketStatus " +
      "ON UWOpsTicketTracker.ID = UWTicketStatus.CureID " +
      "WHERE FO_SubmissionDate BETWEEN " +  stringify(startDate) + " AND " + stringify(endDate) + ";"
}

module.exports = DateRangeQuery;
