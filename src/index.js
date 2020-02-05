// // Load the env file in case you are not using docker-compose.
// require('dotenv').config();

// const express = require('express');
// const graphqlHTTP = require('express-graphql');
// const cors = require('cors');

// const schema = require('./schema/schema');

// const app = express();
// const port = process.env.PORT || 3000;

// // middleware
// // ===========================================================================

// // Needed to graphiql
// app.use(cors());
// app.use('/graphql', graphqlHTTP({
//   schema
// }));

// // routes
// app.get('/', (req, res) => {
//   res.send('Hello world.');
//   console.log("hello world");
// });

// app.listen(port, () => {
//   console.log(`Express is listening on port ${port}`);
// });

// Shorter version
const servers = require('./servers/servers');
servers.run();