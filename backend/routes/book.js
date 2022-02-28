const express = require("express");
const record = express.Router();
const db = require("../database/DatabaseConnection");
const ObjectId = require("mongodb").ObjectId;

record.route("/book").get((req, res) => {
  let dbConnection = db.getDB("books");
  dbConnection
    .collection("books")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

record.route("/book/:id").get((req, res) => {
  let dbConnection = db.getDB();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("books").findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//create a new record.
record.route("/book/add").post((req, response) => {
  let dbConnection = db.getDB();
  let myobj = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    cover: req.body.cover,
    year: req.body.year,
    description: req.body.description,
    pages: req.body.pages,
    publisher: req.body.publisher,
    stock: req.body.stock,
  };
  dbConnection.collection("books").insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

//update a record by id.
record.route("/book/edit/:id").post((req, response) => {
  let dbConnection = db.getDB();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      cover: req.body.cover,
      year: req.body.year,
      description: req.body.description,
      pages: req.body.pages,
      publisher: req.body.publisher,
      stock: req.body.stock,
    },
  };
  dbConnection.collection("books").updateOne(myquery, newvalues, (err, res) => {
    if (err) throw err;
    console.log("1 book updated");
    response.json(res);
  });
});

//delete a record
record.route("/book/delete/:id").delete((req, response) => {
  let dbConnection = db.getDB();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("books").deleteOne(myquery, (err, obj) => {
    if (err) throw err;
    console.log("1 book deleted");
    response.status(obj);
  });
});

module.exports = record;
