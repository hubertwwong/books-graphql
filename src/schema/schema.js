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

const AuthorGooseModel = require('../mongoose/model/authorModel');
const BookGooseModel = require('../mongoose/model/bookModel');

// Dummy data
const books = [
  {name: 'boring book 1', genre: 'placeholder', id: "1", authorId: "1"},
  {name: 'boring book 2', genre: 'placeholder', id: "2", authorId: "1"},
  {name: 'LOTR', genre: 'fantasy', id: "3", authorId: "2"},
  {name: 'Star Wars I', genre: 'Sci-Fi', id: "4", authorId: "3"},
  {name: 'Star Wars II', genre: 'Sci-Fi', id: "5", authorId: "3"},
  {name: 'Star Wars III', genre: 'Sci-Fi', id: "6", authorId: "3"},
];

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
      resolve: async (parent, args) => {
        let res = await AuthorGooseModel.findOne({id: args.authorId});
        return res;
        // return _.find(authors, {id: parent.authorId});
      }
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
      resolve: async (parent, args) => {
        let res = await BookGooseModel.find({authorId: parent.id});
        return res;
        // return _.filter(books, {authorId: parent.id})
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
      resolve: async (parent, args) => {
        let res = await BookGooseModel.findOne({_id: args.id});
        return res;
        // return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve: async (parent, args) => {
        let res = await AuthorGooseModel.findOne({_id: args.id});
        return res;
        // return _.find(authors, {id: args.id});
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: async (parent, args) => {
        let res = await BookGooseModel.find();
        return res;
        // return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: async (parent, args) => {
        //return authors;
        let res = await AuthorGooseModel.find();
        return res;
      }
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
      resolve: async (parent, args) => {
        author = new AuthorGooseModel({
          name: args.name,
          age: args.age
        });
        let res = author.save();
        return res;
      }
    },
    updateAuthor: {
      type: AuthorType,
      args: {
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve: async (parent, args) => {
        author = await AuthorGooseModel.findOne({_id: args.id});
        if (author) {
          if (author.name) {author.name = args.name;}
          if (author.age) {author.age = args.name;}
          let res = await author.save();
          return res
        }
        return Promise.reject("Author not found");
      }
    },
    addBook: {
      type: BookType,
      args: {
        authorId: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
      },
      resolve: async (parent, args) => {
        book = new BookGooseModel({
          authorId: args.authorId,
          name: args.name,
          genre: args.genre
        });
        let res = book.save();
        return res;
      }
    },
    updateBook: {
      type: BookType,
      args: {
        id: {type: GraphQLString},
        authorId: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
      },
      resolve: async (parent, args) => {
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
      }
    }
  }
});

// 5e3b1c6b9b4fe00151aa9b4

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});