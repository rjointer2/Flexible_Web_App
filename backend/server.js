
// Modules

const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const PORT = process.env.PORT || 3000;

// Graph Query Schema

const graphQLSchema = require('./queries/schemas/index');
const graphQLResolvers = require('./queries/resolvers/index');

// Middleware

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true,
}))

// Routes

app.get('/', (req, res) => {
    res.json('Hello World')
});

// Listen for request 

mongoose.connect(`mongodb+srv://${process.env.UN}:${process.env.PW}@postshiftapp.lb6zv.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        app.listen(PORT, () => {
            console.log('Server is listening...')
        })
}).catch(err => {
    console.log('oh no')
});