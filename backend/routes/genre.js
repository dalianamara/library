const express = require("express");
const genre = express.Router();
const db = require("../database/DatabaseConnection");

genre.route("/genre").get((req, res) => {
  let dbConnection = db.getDatabase("genres");
  dbConnection
    .collection("genres")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

//create a new genre.
genre.route("/genre/add").post((req, response) => {
  let dbConnection = db.getDatabase();
  let myobj = {
    name: req.body.name,
  };
  dbConnection.collection("genres").insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = genre;
