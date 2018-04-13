const express = require('express')
const GraphqlHTTP = require('express-graphql')

const app = express()
const schema = require('./schema/schema')

const APP_PORT = 4000

app.use('/graphql', GraphqlHTTP(() => ({
  schema: schema,
  graphiql: true,
  })
))
app.listen(APP_PORT)

console.log(`Started on http://localhost:${APP_PORT}/`)