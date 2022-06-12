const express = require("express");
const record = express.Router();
const db = require("../database/DatabaseConnection");
const ObjectId = require("mongodb").ObjectId;

record.route("/book").get((req, res) => {
  let dbConnection = db.getDatabase("books");
  dbConnection
    .collection("books")
    .find()
    .toArray((error, result) => {
      if (error) throw error;
      res.json(result);
    });
});

record.route("/book/:id").get((req, res) => {
  let dbConnection = db.getDatabase();
  let myquery = { _id: ObjectId(req.params.id) };
  dbConnection.collection("books").findOne(myquery, (error, result) => {
    if (error) throw error;
    if (result === null) {
      res.statusCode = 404;
      return res.json({
        status: res.statusCode,
        statusMessage: "Not found",
      });
    } else {
      result["status"] = res.statusCode;
      result["statusMessage"] = "Success";
      res.json(result);
    }
  });
});

//create a new record.
record.route("/book/add").post((req, response) => {
  let dbConnection = db.getDatabase();
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
  dbConnection.collection("books").insertOne(myobj, (error, res) => {
    if (error) throw error;
    response.json(res);
  });
});

//update a record by id.
record.route("/book/edit/:id").post((request, response) => {
  let dbConnection = db.getDatabase();
  let myquery = { _id: ObjectId(request.params.id) };
  let newvalues = {
    $set: {
      author: request.body.author,
      genre: request.body.genre,
      cover: request.body.cover,
      year: request.body.year,
      description: request.body.description,
      pages: request.body.pages,
      publisher: request.body.publisher,
      stock: request.body.stock,
    },
  };
  dbConnection
    .collection("books")
    .updateOne(myquery, newvalues, (error, result) => {
      if (error) {
        throw error;
      }
      if (result.matchedCount === 0) {
        return (
          (result["status"] = 115),
          (result["statusMessage"] = "erroror to update book!")
        );
      }
      response.json(result);
    });
});

//delete a record
record.route("/book/delete/:id").delete((request, response) => {
  let dbConnection = db.getDatabase();
  let myquery = { _id: ObjectId(request.params.id) };
  dbConnection.collection("books").deleteOne(myquery, (error, result) => {
    if (error) throw error;
    result["method"] = request.method;
    result["status"] = response.status;
    response.status(result);
  });
});

module.exports = record;
