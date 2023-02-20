const express = require("express")
const { graphqlHTTP } = require('express-graphql');
const mongoose = require("mongoose")
const resolvers = require("./GraphQL/resolvers")
const schema = require("./GraphQL/schema")

const app = express()

//

mongoose.connect('mongodb+srv://LaleMulati:Az2PEP5sKmDnGwby@cluster0.4xu6fb0.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(3000, () => { 
    console.log('Server is running...') 
  });
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log(err)
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);
