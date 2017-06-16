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
    var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

    //now take the second position of the array for the month
    //This only works if the date is in the format YYYY-MM-DD
    var currentYear = parseInt(arr[0],10)
    var currentMonth = parseInt(arr[1],10)
    var day = 21

    console.log("Date values: " + currentYear + "/" + currentMonth)

    var lower = new Date();
    var upper = new Date();

    if(submissionDate >= lower.setFullYear(currentYear, currentMonth, day) && submissionDate <= upper.setFullYear(currentYear, currentMonth + 1, day))
    {
        fiscalMonth = currentMonth + 1
    }
    else {
      fiscalMonth = currentMonth
    }
    console.log("Fiscal lower:" + lower)
    console.log("Fiscal month:" + fiscalMonth)
    console.log("Fiscal upper: " + upper)

    return callback(null, fiscalMonth)
  }
  catch(e){
    return callback(e, null)
  }
}

module.exports = FiscalMonth;
