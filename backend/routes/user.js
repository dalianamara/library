const express = require("express");
const user = express.Router();
const db = require("../database/DatabaseConnection");
const ObjectId = require("mongodb").ObjectId;

user.route("/user").get((req, res) => {
  let dbConnection = db.getDB("users");
  dbConnection
    .collection("users")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

user.route("/user/:id").get((req, res) => {
  let dbConnection = db.getDB();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("users").findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//create a new user.
user.route("/user/add").post((req, response) => {
  let dbConnection = db.getDB();
  let newUser = {
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
  dbConnection.collection("users").insertOne(newUser, (err, res) => {
    if (err) throw err;
    response.json(res);
    console.log(res)
  });
});

//update a user by id.
user.route("/user/update/:id").post((req, response) => {
  let dbConnection = db.getDB();
  let id = { _id: ObjectId(req.params.id) };
  let newUser = {
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
  dbConnection.collection("users").updateOne(id, newUser, (err, res) => {
    if (err) throw err;
    response.json(res);
    
  });
});

//delete a user
user.route("/:id").delete((req, response) => {
  let dbConnection = db.getDB();
  let id = { _id: ObjectId(req.params.id) };
  dbConnection.collection("users").deleteOne(id, (err, obj) => {
    if (err) throw err;
    response.status(obj);
  });
});

module.exports = user;
