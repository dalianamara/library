const express = require("express");
const genre = express.Router();
const db = require("../database/DatabaseConnection");

genre.route("/genre").get((req, response) => {
  let dbConnection = db.getDatabase("genres");
  dbConnection
    .collection("genres")
    .find()
    .toArray((error, result) => {
      if (error) throw error;
      response.json(result);
    });
});

//create a new genre.
genre.route("/genre/add").post((req, response) => {
  let dbConnection = db.getDatabase();
  let genre = {
    name: req.body.name,
  };
  dbConnection.collection("genres").insertOne(genre, (error, result) => {
    if (error) throw error;
    response.json(result);
  });
});

module.exports = genre;
