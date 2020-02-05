const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType, 
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

// const authors = [
//   {}
// ]

// Base types
// 1. need the ()=>({}) syntax.
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type : GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args) {
        return _.find(books, {id: args.id});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});