function OptionalArguments(options){
  console.log("OptionalArguments object\n")
  console.log("Constructor arguments\n")
  console.log("start date: " + options.startDate);
  console.log("end date: " + options.endDate);
  console.log("yesterday: " + options.yesterday);

  this.startDate = options.startDate;
  this.endDate = options.endDate;
  this.yesterday = options.yesterday;
}

module.exports = OptionalArguments;
