const mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
  name: String,
  genre: String,
  authorId: String
});

module.exports = BookSchema;