const express = require("express");
const record = express.Router();
const db = require("../database/DatabaseConnection");

record.route("/record").get((req, res) => {
    let dbConnection = db.getDB("users");
    dbConnection.collection("records").find({}).toArray((err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

record.route("/record/:id").get((req, res) => {
    let dbConnection = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    dbConnection
        .collection("records")
        .findOne(myquery, (err, result) => {
          if (err) throw err;
          res.json(result);
        });
  });
  
  //create a new record.
  record.route("/record/add").post((req, response) => {
    let dbConnection = dbo.getDb();
    let myobj = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };
    dbConnection.collection("records").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });
  
  //update a record by id.
  record.route("/update/:id").post((req, response) => {
    let dbConnection = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newvalues = {
      $set: {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      },
    };
    dbConnection
      .collection("records")
      .updateOne(myquery, newvalues, (err, res) => {
        if (err) throw err;
        console.log("1 user updated");
        response.json(res);
      });
  });
  
  //delete a record
  record.route("/:id").delete((req, response) => {
    let dbConnection = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    dbConnection.collection("records").deleteOne(myquery, (err, obj) => {
      if (err) throw err;
      console.log("1 user deleted");
      response.status(obj);
    });
  });
  
  module.exports = record;