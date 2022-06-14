const { MongoClient } = require("mongodb");
const db = process.env.ATLAS_URI;
const client = new MongoClient(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

function connectToServer(callback) {
  client.connect((err, db) => {
    if (db) {
      _db = db.db("library");
      console.log("Successfully connected to database.");
    }
    return callback(err);
  });
}

function getDatabase() {
  return _db;
}

module.exports = {
  connectToServer,
  getDatabase,
};
