const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType, 
  GraphQLInt,
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
} = graphql;

// Dummy data
const books = [
  {name: 'book 1', genre: 'placeholder', id: "1"},
  {name: 'LOTR', genre: 'fantasy', id: "2"},
  {name: 'Star Wars', genre: 'Sci-Fi', id: "3"},
];

const authors = [
  {name: 'John Smith', age: 44, id: "1"},
  {name: 'Jane Smith', age: 22, id: "2"},
  {name: 'Billy Jean', age: 21, id: "3"}
];

// Base types
// 1. need the ()=>({}) syntax.
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type : GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(authors, {id: args.id});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});