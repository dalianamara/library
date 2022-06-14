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

user.route("/user/login").post(async (request, response) => {
  let dbConnection = db.getDatabase("users");
  const { username, password } = request.body;
  const user = await dbConnection.collection("users").findOne({ username });

  if (username && password !== undefined) {
    if (user) {
      response.json({
        _id: user._id,
        email: user.email,
        password: user.password,
        user: user.user,
        username: user.username,
      });
    } else {
      return response.send({
        success: false,
        message: "Invalid credentials",
      });
    }
  }
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
user.route("/user/add").post(async (request, response) => {
  let dbConnection = db.getDatabase();
  const { email, username } = request.body;
  let newUser = {
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
  const emailExists = await dbConnection.collection("users").findOne({ email });
  const usernameExists = await dbConnection
    .collection("users")
    .findOne({ username });

  if (emailExists && usernameExists) {
    return response.send({ success: false, message: "Both exist" });
  } else if (emailExists) {
    return response.send({ success: false, message: "Email already exists" });
  } else if (usernameExists) {
    return response.send({
      success: false,
      message: "Username already exists",
    });
  }

  dbConnection.collection("users").insertOne(newUser, (error, result) => {
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
