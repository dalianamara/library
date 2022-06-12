const express = require("express");
const user = express.Router();
const db = require("../database/DatabaseConnection");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");

user.route("/user").get((request, response) => {
  let dbConnection = db.getDatabase("users");
  dbConnection
    .collection("users")
    .find()
    .toArray((error, result) => {
      if (error) throw error;
      response.json(result);
    });
});

user.route("/user/:id").get((request, response) => {
  let dbConnection = db.getDatabase();
  let condition = { _id: ObjectId(request.params.id) };
  dbConnection.collection("users").findOne(condition, (error, result) => {
    if (error) throw error;
    response.json(result);
  });
});

//create a new user.
user.route("/user/add").post((request, response) => {
  let dbConnection = db.getDatabase();
  let user = {
    first: request.body.first,
    last: request.body.last,
    email: request.body.email,
    username: request.body.username,
    password: bcrypt.hashSync(request.body.password, bcrypt.genSaltSync()),
    street: request.body.street,
    phoneNumber: request.body.phoneNumber,
    city: request.body.city,
    user: request.body.user,
  };
  dbConnection.collection("users").insertOne(user, (error, result) => {
    if (error) throw error;
    response.json(result);
  });
});

//update a user by id.
user.route("/user/update/:id").post((request, response) => {
  let dbConnection = db.getDatabase();
  let condition = { _id: ObjectId(request.params.id) };
  let newUser = {
    $set: {
      first: request.body.first,
      last: request.body.last,
      email: request.body.email,
      username: request.body.username,
      password: bcrypt.hashSync(request.body.password, bcrypt.genSaltSync()),
      street: request.body.street,
      phoneNumber: request.body.phoneNumber,
      city: request.body.city,
      user: request.body.user,
    },
  };
  dbConnection
    .collection("users")
    .updateOne(condition, newUser, (error, result) => {
      if (error) throw error;
      response.json(result);
    });
});

//delete a user
user.route("/:id").delete((request, response) => {
  let dbConnection = db.getDatabase();
  let condition = { _id: ObjectId(request.params.id) };
  dbConnection.collection("users").deleteOne(condition, (error, result) => {
    if (error) throw error;
    response.status(result);
  });
});

module.exports = user;
