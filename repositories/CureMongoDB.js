var _config
var collection

function CureMongoDBRepository(config){
  console.log('Entered the MongoDBRepository constructor');

  //Get a local instance of the config object to use for the Mongo connection
  if("undefined" === typeof config){
    console.console.log("Config object is null. Can't create an instance of the MongoDB repo.");
    process.exit();
  }

  _config = config
}

//Returns a db object for accessing collection
CureMongoDBRepository.prototype.InsertDocuments = function(data, callback){
  //get the collection
  console.log("Collection name: " + _config.collectionName)

  if("undefined" === typeof _config.collectionName){
    console.log("Couldn't get the collection name from config object. Exiting program")
    process.exit()
  }

  //create instance of connection object
  var mongoClient = require('mongodb').MongoClient,
  assert = require('assert')

  //Make connection to mongod
  mongoclient.connect(_config.Uri, function(err, db){
    console.log("Connected to MongoDB server")

    if(err){
      callback(err)
    }

    if("undefined" === typeof data){
      console.log("There are no documents to insert")
      process.exit();
    }

    //call the insertDocuments function
    insertDocuments(db, data, function(err, result){
      console.log("Closing connection to Mongo server")
      db.close();

      if(err){
        callback(err)
      }

      callback(result);
    })
  })

}

//a function with a callback has its own logic, as well as calling the logic in the
//callback
var insertDocuments = function(db, data, callback){
    //get the collectionName
    var collection = db.collection(_config.collectionName)

    //insert into the collection
    collection.InsertMany(data, function(err, result){
      if(err){
        callback(err)
      }

      console.log("Inserted " + result.result.n + " documents")
      callback(result)
    })
}

module.exports = CureMongoDBRepository;
