const queryDate = require('../models/queryDate.js');
var _date, sourceTable, origination, query;

function Cure24HourQuery() {
  console.log("CureQueryFor24Hours constructor");

  _queryDate = new queryDate();
  console.log("Date to be queiried:" + _queryDate.today);

  sourceTable= 'UWOpsTicketTracker';
  origination = 1;


   this.query = "SELECT ID, FO_OwnerUserID,  FO_AckDate, FO_RemedyTicketNo, To_SubmitterName, TO_SubmitterEmail, TO_SubmitterContactNo," +
  			"FO_SubmissionDate, FO_Severity, FO_Priority, UD_UserCompanyName, MD_SubmissionEmail, UD_UserLogonEmail," +
  			"MD_DefectType, UC_ContactName, UC_ContactEmail, UC_BestTimeToContact, UC_UserContactNo, UC_PermissionToAccess," +
  			" ID_Product, ID_TypeOfIssue, ID_OS, ID_Browser, ID_FoundThroghSSR, ID_SRREmail, ID_IssueSummary, MD_SaleAmount, " +
  			"ID_StepsToReproduce, ID_Comment, MD_SLA, MD_Status, MD_NotifySLA, MD_Outlier, MD_CustImpact"
  			+ " FROM" + sourceTable + " WHERE FO_SubmissionDate = '" + _queryDate.today + "';"
}

//Add a property for the query

module.exports = Cure24HourQuery;
