const BookGooseModel = require('../../mongoose/model/bookModel');

const getBooks = async (parent, args) => {
  let res = await BookGooseModel.find();
  return res;
  // return books;
}

const getBookById = async (parent, args) => {
  let res = await BookGooseModel.findOne({_id: args.id});
  return res;
  // return _.find(books, {id: args.id});
}

const getBooksByAuthorId = async (parent, args) => {
  let res = await BookGooseModel.find({authorId: parent.id});
  return res;
  // return _.filter(books, {authorId: parent.id})
}

const addBook = async (parent, args) => {
  book = new BookGooseModel({
    authorId: args.authorId,
    name: args.name,
    genre: args.genre
  });
  let res = book.save();
  return res;
}

const updateBook = async (parent, args) => {
  book = await BookGooseModel.findOne({_id: args.id});
  
  if (book) {
    if (book.authorId) {book.authorId = args.authorId;}
    if (book.name) {book.name = args.name;}
    //book.name = args.name;
    if (book.genre) {book.genre = args.genre;}

    let res = book.save();
    return res;
  }
  return Promise.reject("Book not found");
};

module.exports = {
  getBooks,
  getBookById,
  getBooksByAuthorId,
  addBook,
  updateBook
}