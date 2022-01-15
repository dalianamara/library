const { MongoClient } = require("mongodb");
const db = process.env.ATLAS_URI;
const client = new MongoClient(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
let _db;
 
module.exports = {
  connectToServer:  (callback) => {
    client.connect((err, db) => {
      if (db)
      {
        _db = db.db("library");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDB: () => {
    return _db;
  },
};