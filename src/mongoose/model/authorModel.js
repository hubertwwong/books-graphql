const mongoose = require('mongoose');

const AuthorSchema = require('../schema/authorSchema')

module.exports = mongoose.model('Author', AuthorSchema);