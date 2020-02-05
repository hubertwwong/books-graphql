const mongoose = require('mongoose');

let AuthorSchema = new mongoose.Schema({
  name: String,
  age: String,
});

module.exports = AuthorSchema;