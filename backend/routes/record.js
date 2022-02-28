const express = require("express");
const record = express.Router();
const db = require("../database/DatabaseConnection");
const ObjectId = require("mongodb").ObjectId;

record.route("/record").get((req, res) => {
  let dbConnection = db.getDB("users");
  dbConnection
    .collection("users")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

record.route("/record/:id").get((req, res) => {
  let dbConnection = db.getDB();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("users").findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//create a new record.
record.route("/record/add").post((req, response) => {
  let dbConnection = db.getDB();
  let myobj = {
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    street: req.body.street,
    phoneNumber: req.body.phoneNumber,
    city: req.body.city,
    user: req.body.user,
  };
  dbConnection.collection("users").insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

//update a record by id.
record.route("/record/update/:id").post((req, response) => {
  let dbConnection = db.getDB();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      street: req.body.street,
      phoneNumber: req.body.phoneNumber,
      city: req.body.city,
      user: req.body.user,
    },
  };
  dbConnection.collection("users").updateOne(myquery, newvalues, (err, res) => {
    if (err) throw err;
    console.log("1 user updated");
    response.json(res);
  });
});

//delete a record
record.route("/:id").delete((req, response) => {
  let dbConnection = db.getDB();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("users").deleteOne(myquery, (err, obj) => {
    if (err) throw err;
    console.log("1 user deleted");
    response.status(obj);
  });
});

module.exports = record;
