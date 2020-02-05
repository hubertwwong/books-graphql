const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType, 
  GraphQLInt,
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

// Dummy data
const books = [
  {name: 'boring book 1', genre: 'placeholder', id: "1", authorId: "1"},
  {name: 'boring book 2', genre: 'placeholder', id: "2", authorId: "1"},
  {name: 'LOTR', genre: 'fantasy', id: "3", authorId: "2"},
  {name: 'Star Wars I', genre: 'Sci-Fi', id: "4", authorId: "3"},
  {name: 'Star Wars II', genre: 'Sci-Fi', id: "5", authorId: "3"},
  {name: 'Star Wars III', genre: 'Sci-Fi', id: "6", authorId: "3"},
];

const authors = [
  {name: 'John Smith', age: 44, id: "1"},
  {name: 'JRR Tolkein', age: 22, id: "2"},
  {name: 'George Lucas', age: 21, id: "3"}
];

// Base types
// 1. need the ()=>({}) syntax.
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type : GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, {id: parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, {authorId: parent.id})
      }
    }
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
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parents, args) {
        return authors
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});