const express = require("express");
const record = express.Router();
const db = require("../database/DatabaseConnection");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");
record.route("/librarian").get((req, res) => {
  let dbConnection = db.getDatabase("librarians");
  dbConnection
    .collection("librarians")
    .find()
    .toArray((error, result) => {
      if (error) throw error;
      res.json(result);
    });
});

record.route("/librarian/:id").get((req, res) => {
  let dbConnection = db.getDatabase();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("librarians").findOne(myquery, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

//create a new record.
record.route("/librarian/add").post((req, response) => {
  let dbConnection = db.getDatabase();
  let librarian = {
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.email, bcrypt.genSaltSync()),
    phoneNumber: req.body.phoneNumber,
    user: req.body.user,
  };
  dbConnection.collection("users").insertOne(librarian, (error, result) => {
    if (error) throw error;
    response.json(result);
  });
});

//update a record by id.
record.route("/update/:id").post((req, response) => {
  let dbConnection = db.getDatabase();
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
    .updateOne(myquery, newvalues, (error, res) => {
      if (error) throw error;
      response.json(res);
    });
});

//delete a record
record.route("/:id").delete((req, response) => {
  let dbConnection = db.getDatabase();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("librarians").deleteOne(myquery, (error, obj) => {
    if (error) throw error;
    response.status(obj);
  });
});

module.exports = record;
