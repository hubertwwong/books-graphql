# books



## Libs

1. Express
2. GraphQL
3. express-graphql.
4. CORS middleware (To get other websites to work without worrinng about cross origins.)



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


## Unsorted notes

The basic thing seems to be to.
1. Add a ObjectType
2. Add it to the QueryType.

#### Gotcha

1. The ID objects that get return from the db for lodash to searh through must be string. Probably can improve that.


You want to have this signature.

1. This allows for nesting.
2. This is so that all of the references of the types are visible first.
3. Delay execution until runtime which should have access to all types.

```
fields: () => ({
})
```

vs.

```
fields: {}
```


#### Relationships

Go to the type in question.
In this case `BookType`,
You want to add an additional field.

1. So book can have an author.
2. You have to define the resolve function.
3. The type is the type you defined. In this case AuthorType.

```
author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, {id: parent.authorId});
      }
    }
```

1-many

1. You need a GraphQLList Type
2. Pass the signular to a new.

```
type: new GraphQLList(BookType)
```

The general pattern seems to be to use parent in value..
```
_.filter(books, {authorId: parent.id})
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


#### TO use

1. Start express.
2. Open the html file on the grapiql directory.

#### GraphQL queries

Basic with a args
Remember that You need a `{}` to start the query.
```
{
  book(id: "3") {
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
Remember you need `mutation{}` instead of `{}`
```
mutation {
  addAuthor(name: "foo", age: 42) {
    id
  }
}
```

```
{
  "data": {
    "authors": [
      {
        "id": "5e3b2df340a96d001daf6ca0",
        "name": "foo",
        "age": 42
      },
      {
        "id": "5e3b2dfa40a96d001daf6ca1",
        "name": "bar",
        "age": 42
      }
    ]
  }
}
```

```
{
  "data": {
    "books": [
      {
        "id": "5e3b2ea140a96d001daf6ca2",
        "name": "foo 1"
      },
      {
        "id": "5e3b2ea740a96d001daf6ca3",
        "name": "foo 2"
      },
      {
        "id": "5e3b2ed340a96d001daf6ca4",
        "name": "LOTR"
      },
      {
        "id": "5e3b2ee140a96d001daf6ca5",
        "name": null
      },
      {
        "id": "5e3b2efd40a96d001daf6ca6",
        "name": "Star Wars 2"
      }
    ]
  }
}
```

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
