const mongoose = require("mongoose"),
  booksSchema = mongoose.Schema({
    name: {type: String, required: true},
    summary: String,
    author: {type: String, required: true},
    picture: String,
  });
module.exports = mongoose.model("Books", booksSchema);