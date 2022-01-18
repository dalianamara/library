const express = require("express");
const record = express.Router();
const db = require("../database/DatabaseConnection");
const ObjectId = require("mongodb").ObjectId;

record.route("/librarian").get((req, res) => {
  let dbConnection = db.getDB("librarians");
  dbConnection
    .collection("librarians")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

record.route("/librarian/:id").get((req, res) => {
  let dbConnection = db.getDB();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("librarians").findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//create a new record.
record.route("/librarian/add").post((req, response) => {
  let dbConnection = db.getDB();
  let myobj = {
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  dbConnection.collection("librarians").insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

//update a record by id.
record.route("/update/:id").post((req, response) => {
  let dbConnection = db.getDB();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    },
  };
  dbConnection
    .collection("librarians")
    .updateOne(myquery, newvalues, (err, res) => {
      if (err) throw err;
      console.log("1 record updated");
      response.json(res);
    });
});

//delete a record
record.route("/:id").delete((req, response) => {
  let dbConnection = db.getDB();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("librarians").deleteOne(myquery, (err, obj) => {
    if (err) throw err;
    console.log("1 record deleted");
    response.status(obj);
  });
});

module.exports = record;
