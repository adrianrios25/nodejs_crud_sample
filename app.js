var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.json());

Genre = require("./models/genres");
Book = require("./models/books");

// mongoose.connect("mongodb://localhost/bookstore");
mongoose.connect("mongodb://localhost/bookstore", { useNewUrlParser: true });
var db = mongoose.connection;

app.get("/", function(req, res) {
  res.send("Please use /api/books or /api/genres");
});

app.get("/api/genres", function(req, res) {
  Genre.getGenres(function(err, genres) {
    if (err) {
      throw err;
    }
    res.json(genres);
  });
});

app.post("/api/genres", function(req, res) {
  var genre = req.body;
  console.log(genre);
  Genre.addGenre(genre, function(err, genre) {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.get("/api/books", function(req, res) {
  Book.getBooks(function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.get("/api/books/:_id", function(req, res) {
  Book.getBookById(req.params._id, function(err, book) {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.listen(3000);

console.log("Running on port 3000");
