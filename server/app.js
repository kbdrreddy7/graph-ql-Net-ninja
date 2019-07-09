const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
//mongodb://<dbuser>:<dbpassword>@ds343887.mlab.com:43887/gql-ninja
mongoose.connect(
  "mongodb://kbdrreddy7:kbdrreddy7@ds343887.mlab.com:43887/gql-ninja"
);
mongoose.connection.once("open", () => {
  console.log("conneted to database");
});

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
