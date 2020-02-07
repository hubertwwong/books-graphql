const graphql = require('graphql');
// const _ = require('lodash');

const {
  GraphQLObjectType, 
  GraphQLInt,
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

const {getAuthors, getAuthorById, getAuthorByAuthorId, addAuthor, updateAuthor} = require('./resolvers/authorRes');
const {getBooks, getBookById, getBooksByAuthorId, addBook, updateBook} = require('./resolvers/bookRes');

// Dummy data
// const books = [
//   {name: 'boring book 1', genre: 'placeholder', id: "1", authorId: "1"},
//   {name: 'boring book 2', genre: 'placeholder', id: "2", authorId: "1"},
//   {name: 'LOTR', genre: 'fantasy', id: "3", authorId: "2"},
//   {name: 'Star Wars I', genre: 'Sci-Fi', id: "4", authorId: "3"},
//   {name: 'Star Wars II', genre: 'Sci-Fi', id: "5", authorId: "3"},
//   {name: 'Star Wars III', genre: 'Sci-Fi', id: "6", authorId: "3"},
// ];

// const authors = [
//   {name: 'John Smith', age: 44, id: "1"},
//   {name: 'JRR Tolkein', age: 22, id: "2"},
//   {name: 'George Lucas', age: 21, id: "3"}
// ];

// Base types
// 1. need the ()=>({}) syntax.
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type : GraphQLID},
    authorId: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve: getAuthorByAuthorId
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    _id: {type: GraphQLString},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve: getBooksByAuthorId
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve: getBookById
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve: getAuthorById
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: getBooks
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: getAuthors
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve: addAuthor
    },
    updateAuthor: {
      type: AuthorType,
      args: {
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve: updateAuthor
    },
    addBook: {
      type: BookType,
      args: {
        authorId: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
      },
      resolve: addBook
    },
    updateBook: {
      type: BookType,
      args: {
        id: {type: GraphQLString},
        authorId: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
      },
      resolve: updateBook
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});