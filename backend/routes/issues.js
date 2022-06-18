const express = require("express");
const record = express.Router();
const db = require("../database/DatabaseConnection");
const ObjectId = require("mongodb").ObjectId;

record.route("/issue").get((req, res) => {
  let dbConnection = db.getDatabase("issues");
  dbConnection
    .collection("issues")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

record.route("/issue/:id").get((req, res) => {
  let dbConnection = db.getDatabase();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("issues").findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//create a new record.
record.route("/issue/add").post((req, response) => {
  let dbConnection = db.getDatabase();
  let issue = {
    userId: req.body.userId,
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    city: req.body.city,
    street: req.body.street,
    bookId: req.body.bookId,
    bookTitle: req.body.bookTitle,
    deliveryType: req.body.deliveryType,
    isReturned: req.body.isReturned,
    returnApproval: req.body.returnApproval,
    isApproved: req.body.isApproved,
    fine: req.body.fine,
    issueDate: req.body.issueDate,
    dueDate: req.body.dueDate,
    returnDate: req.body.returnDate,
    isReserved: req.body.isReserved,
    receipt: req.body.receipt,
    paid: null,
    verified: req.body.verified,
  };
  dbConnection.collection("issues").insertOne(issue, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

//update a record by id.
record.route("/issue/edit/:id").post((req, response) => {
  let dbConnection = db.getDatabase();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      userId: req.body.userId,
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      city: req.body.city,
      street: req.body.street,
      bookId: req.body.bookId,
      bookTitle: req.body.bookTitle,
      deliveryType: req.body.deliveryType,
      isReturned: req.body.isReturned,
      returnApproval: req.body.returnApproval,
      isApproved: req.body.isApproved,
      fine: req.body.fine,
      issueDate: req.body.issueDate,
      dueDate: req.body.dueDate,
      returnDate: req.body.returnDate,
      isReserved: req.body.isReserved,
      receipt: req.body.receipt,
      paid: req.body.paid,
      verified: req.body.verified,
    },
  };
  dbConnection
    .collection("issues")
    .updateOne(myquery, newvalues, (err, res) => {
      if (err) throw err;
      response.json(res);
    });
});

//delete a record
record.route("/issue/delete/:id").delete((req, response) => {
  let dbConnection = db.getDatabase();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("issues").deleteOne(myquery, (err, obj) => {
    if (err) throw err;
    response.status(obj);
  });
});

module.exports = record;
