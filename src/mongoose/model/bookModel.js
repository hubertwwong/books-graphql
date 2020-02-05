const mongoose = require('mongoose');

const BookSchema = require('../schema/bookSchema')

module.exports = mongoose.model('Book', BookSchema);