function FiscalMonth(){
  console.log("Fiscal Month Constructor")
}

FiscalMonth.prototype.GetFiscalMonth = function(submissionDate, callback){
  console.log("Entered GetFiscalMonth function")

  try{
    var fiscalMonth = ""

    //need to parse out month and day from submission date
    var arr = submissionDate.split("-")

    //create an array of month values
    var months = ["01", "02", "03", "04", "05",
    "06", "07", "08", "09", "10", "11"]

    //now take the second position of the array for the month
    //This only works if the date is in the format YYYY-MM-DD
    var currentYear = parseInt(arr[0],10)
    var currentMonth = parseInt(arr[1],10)
    var day = 21
    var lower = new Date(currentYear, currentMonth - 1, day, 00, 00, 000)
    var upper = new Date(currentYear, currentMonth, day, 00, 00, 000)

    console.log("Fiscal lower:" + lower)
    console.log("Fiscal upper: " + upper)

    //the submission date, lower, and upper have to be in ISO format
    if(submissionDate >= lower)
    {
        fiscalMonth = upper
    }
    else {
      fiscalMonth = lower
    }

    return callback(null, fiscalMonth)
  }
  catch(e){
    return callback(e, null)
  }
}

module.exports = FiscalMonth;
