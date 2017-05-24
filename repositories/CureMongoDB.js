var _config
var collection
var assert = require('assert')

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
    insertDocuments(db, data, function(result){
      console.log("Closing connection to Mongo server")
      db.close();
      callback(result)
    })
  })
}

//a function with a callback has its own logic, as well as calling the logic in the
//callback
var insertDocuments = function(db, data, callback){
    try {
      //insert into the collection
      //get the collectionName
      var collection = db.collection(_config.collectionName);
      collection.insert(data, {ordered:false})
      console.log("Inserted documents: " + data);

      callback("success");

    } catch (e) {
      console.log("Repo: An error occurred " + e);
      process.exit();
    }
  }
module.exports = CureMongoDBRepository;
