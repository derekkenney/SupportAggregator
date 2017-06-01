function OptionalArguments(options){
  this.startDate = options.startDate !== 'undefined' ? options.startDate : "nothing";
  this.endDate = options.endDate !== 'undefined' ? options.endDate : "nothing";
  this.yesterday = options.yesterday !== 'undefined' ? options.yesterday : "nothing";
}

module.exports = OptionalArguments;
