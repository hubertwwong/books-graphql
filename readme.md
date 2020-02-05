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
This allows for nesting.
```
fields: () => ({
})
```

#### TO use

1. Start express.
2. Open the html file on the grapiql directory.

#### GraphQL

```
{
  book(id: "3") {
    name
  }
}
```

## links

Video that I'm following.
https://www.youtube.com/watch?v=ed8SzALpx1Q