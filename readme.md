# books

## TL:DR

Just a simple Author Books graphQL demo to learn how graphQL works.



## To use.

1. `Docker compose up`
2. Open the html file in the `graphiql` folder in a browser.


## Libs used.

1. Express
2. GraphQL
3. express-graphql.
4. CORS middleware. Mostly to bypass warnings with CORS.
5. Mongoose. Connect to mongo db to have some simple persistance.



## Express basic setup.

1. I think you want the middleware in this order.
2. CORS over graphQL.
3. You want it to pass in a schema which should generally be the root query object.

```
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema
}));

```

Root Query export looks like.
```
module.exports = new GraphQLSchema({
  query: RootQuery
});
```


## Things I noticed.

1. Circular references must be in the same file. Otherwise there isn't an easy way to import them in node.
2. Fields. Need the arrow function.
3. GraphQLList Type needed for a list.

#### Cirrular depenceny

When I was following the tutorial I notice a cicrular dependency.
1. Seems to have issues if you split the schema into different files. One file will not get imported and be undefined.
2. Probably a design flaw. I think you are suppose to add an intermediary of some sorts to not have this issue in the first place.

https://stackoverflow.com/questions/42531322/graphql-circular-dependency
https://siawyoung.com/coding/javascript/circular-references-graphql-type-definitions.html

graphql split schema circular dependency

https://medium.com/the-guild/manage-circular-imports-hell-with-graphql-modules-4b1611dee781


###### Fields

1. You want the arrow syntax for delay execution.
2. This is so that all of the references of the types are visible first.

```
fields: () => ({
})
```

vs.

```
fields: {}
```


#### Setting up a nested field.

1. Go to the type in question.
2. In this case `BookType`,
3. Add the field name, `author`.
4. Set the type. `AuthorType`
5. Define the resolve function `resolve:`

```
author: {
      type: AuthorType,
      resolve: (parent, args) => {
        // get data from data source. This was a array for a simple test.
        return _.find(authors, {id: parent.authorId});
      }
    }
```

#### Mutation

This is how to update the graphql

1. Works like a a root query.
2. You change `name: 'RootQueryType'` to `name: 'Mutation'`
3. `Args` are the new object property.
4. addType is the naming convention? Like `addAuthor`
5. 1:47:00 is where is starts roughly.
6. You need to export the mutation too.
7. On the frontend, you need to add the `mutation` keyword
8. You have to return on the resolve function to satisfy the contract.



## GraphQL queries examples.

Basic with a args
Remember that You need a `{}` to start the query.
```
{
  book(id: "3") {
    name
  }
}
```

Show all books with name
```
{
  books {
    name
  }
}
```

Nested query
```
{
  book(id: 1) {
    name,
    author {
      name
    }
  }
}
```

Mutation to add author.
1. Remember you need `mutation{}` instead of `{}`
2. Retruns the id.

```
mutation {
  addAuthor(name: "foo", age: 42) {
    id
  }
}
```

Mutation to update book.
```
mutation {
  updateBook(id: "5e3b2ee140a96d001daf6ca5", authorId: "5e3b2dfa40a96d001daf6ca1") {
    name
  }
}
```

## links

Video that I'm following.
https://www.youtube.com/watch?v=ed8SzALpx1Q
