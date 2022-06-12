const express = require("express");
const review = express.Router();
const db = require("../database/DatabaseConnection");
const ObjectId = require("mongodb").ObjectId;

review.route("/review").get((req, res) => {
  let dbConnection = db.getDatabase("reviews");
  dbConnection
    .collection("reviews")
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

review.route("/review/:id").get((req, res) => {
  let dbConnection = db.getDatabase();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("reviews").findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//create a new review.
review.route("/review/add").post((req, response) => {
  let dbConnection = db.getDatabase();
  let myobj = {
    bookId: req.body.bookId,
    userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    date: req.body.date,
    content: req.body.content,
    stars: req.body.stars,
    isApproved: req.body.isApproved,
  };
  dbConnection.collection("reviews").insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

//update a review by id.
review.route("/review/edit/:id").post((req, response) => {
  let dbConnection = db.getDatabase();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      bookId: req.body.bookId,
      userId: req.body.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      date: req.body.date,
      content: req.body.content,
      stars: req.body.stars,
      isApproved: req.body.isApproved,
    },
  };
  dbConnection
    .collection("reviews")
    .updateOne(myquery, newvalues, (err, res) => {
      if (err) throw err;
      console.log("1 review updated");
      response.json(res);
    });
});

//delete a review
review.route("/review/delete/:id").delete((req, response) => {
  let dbConnection = db.getDatabase();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("reviews").deleteOne(myquery, (err, obj) => {
    if (err) throw err;
    console.log("1 review deleted");
    response.status(obj);
  });
});

module.exports = review;
