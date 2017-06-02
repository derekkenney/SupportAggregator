var _config
var collection
var assert = require('assert')
var async = require("async");

function CureMongoDBRepository(config){
  		console.log('\n#########################################MongoDB#################################################\n')

  //Get a local instance of the config object to use for the Mongo connection
  if("undefined" === typeof config){
    console.console.log("Config object is null. Can't create an instance of the MongoDB repo.");
    process.exit();
  }

  _config = config
}

//Returns a db object for accessing collection
CureMongoDBRepository.prototype.InsertDocuments = function(data, callback){
  console.log('\n#########################################Inserting Documents#################################################\n')

  //get the collection
  console.log("Collection name: " + _config.collectionName)

  if("undefined" === typeof _config.collectionName){
    console.log("Couldn't get the collection name from config object. Exiting program")
    process.exit()
  }

  //create instance of connection object
  var mongoClient = require('mongodb').MongoClient

  //Make connection to mongod
  mongoClient.connect(_config.uri, function(err, db){
    console.log("Connected to MongoDB server")

    if("undefined" === typeof data){
      console.log("There are no documents to insert")
      process.exit();
    }

    //call the insertDocuments function
    insertDocuments(db, data, function(err, result){
      console.log("Closing connection to Mongo server")
      callback(err, result)
    })
  })
}

//a function with a callback has its own logic, as well as calling the logic in the
//callback
var insertDocuments = function(db, data, callbackExternal){
    try {
      //insert into the collection
      //get the collectionName

      if("undefined" === typeof db){
        console.log("The db object is null")
        process.exit();
      }

      var collection = db.collection(_config.collectionName);

      //callback is a default callback of the async each function. Not to be confused with your own callback
      console.log("Entered async insert loop")

      async.each(data, function(item, callback){
        if("undefined" !== typeof item.CureID) {
            console.log("Data to be upserted " + item.CureID);

            var dateTime = require('node-datetime');
            var dt = dateTime.create();
            var formatted = dt.format('Y-m-d H:M:S');

            collection.createIndex({CureID : 1});

            collection.update({CureID: item.CureID},
              {CureID: item.CureID, SubmissionDate : item.SubmissionDate, Severity : item.Severity, ResolutionDate : item.ResolutionDate, TimeStamp : formatted},
              { upsert: true },
              function(err, doc){
                if(err){
                  console.log("An error occurred inserting doc");
                }
                else{
                    console.log("Record upserted")
                    callback();
                }
              }
            );
         } else {
            console.log("Missing Cure ID");
            callback();
         }
       }, function(err){
          //call the callback that is outside of the async loop
          if(err){
            callbackExternal(err, null);
          } else {
            callbackExternal(null, "Inserts completed");
          }
        }
      )
    } catch (e) {
      console.log("Repo: An error occurred " + e);
      process.exit();
    }
  }
module.exports = CureMongoDBRepository;
