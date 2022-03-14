const express = require("express");
const feedback = express.Router();
const db = require("../database/DatabaseConnection");
const ObjectId = require("mongodb").ObjectId;

feedback.route("/feedback").get((req, res) => {
  let dbConnection = db.getDB("feedbacks");
  dbConnection
    .collection("feedbacks")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

feedback.route("/feedback/:id").get((req, res) => {
  let dbConnection = db.getDB();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("feedbacks").findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//create a new feedback.
feedback.route("/feedback/add").post((req, response) => {
  let dbConnection = db.getDB();
  let myobj = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };
  dbConnection.collection("feedbacks").insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

//update a feedback by id.
feedback.route("/feedback/update/:id").post((req, response) => {
  let dbConnection = db.getDB();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    },
  };
  dbConnection
    .collection("feedbacks")
    .updateOne(myquery, newvalues, (err, res) => {
      if (err) throw err;
      console.log("1 user updated");
      response.json(res);
    });
});

//delete a feedback
feedback.route("/:id").delete((req, response) => {
  let dbConnection = db.getDB();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("feedbacks").deleteOne(myquery, (err, obj) => {
    if (err) throw err;
    console.log("1 user deleted");
    response.status(obj);
  });
});

module.exports = feedback;
