const express = require("express");
const feedback = express.Router();
const db = require("../database/DatabaseConnection");

feedback.route("/feedback").get((req, res) => {
  let dbConnection = db.getDatabase("feedbacks");
  dbConnection
    .collection("feedbacks")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

//create a new feedback.
feedback.route("/feedback/add").post((req, response) => {
  let dbConnection = db.getDatabase();
  let feedback = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };
  dbConnection.collection("feedbacks").insertOne(feedback, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = feedback;
