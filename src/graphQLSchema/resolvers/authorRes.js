const AuthorGooseModel = require('../../mongoose/model/authorModel');

const getAuthors = async (parent, args) => {
  //return authors;
  let res = await AuthorGooseModel.find();
  return res;
}

const getAuthorById = async (parent, args) => {
  let res = await AuthorGooseModel.findOne({_id: args.id});
  return res;
  // return _.find(authors, {id: args.id});
}

const getAuthorByAuthorId = async (parent, args) => {
  let res = await AuthorGooseModel.findOne({id: args.authorId});
  return res;
}

const addAuthor = async (parent, args) => {
  author = new AuthorGooseModel({
    name: args.name,
    age: args.age
  });
  let res = author.save();
  return res;
}

const updateAuthor = async (parent, args) => {
  author = await AuthorGooseModel.findOne({_id: args.id});
  if (author) {
    if (author.name) {author.name = args.name;}
    if (author.age) {author.age = args.name;}
    let res = await author.save();
    return res
  }
  return Promise.reject("Author not found");
}

module.exports = {
  getAuthors,
  getAuthorById,
  getAuthorByAuthorId,
  addAuthor,
  updateAuthor
}