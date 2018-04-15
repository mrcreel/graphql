const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')

const BASE_URL = `http://104.236.41.59/wp-json/wp/v2`

const typeDefs =
  `
  type Query {
    academicDepartment (id: ID!): AcademicDepartment
    academicDepartments: [AcademicDepartment!]!
  }

  type AcademicDepartment {
    id: ID!
    name: String!
    slug: String!
  }

  `
const resolvers = {
  Query: {
    academicDepartment: (parent, args) => {
      return (
        fetch(`${BASE_URL}/faculty-department/${args.id}?per_page=100`)
      )
      .then(res => res.json())
    },
    academicDepartments: () => {
      return (
        fetch(`${BASE_URL}/faculty-department/?per_page=100`)
      )
      .then(res => res.json())
    },
  },
}

const APP_PORT = 4000
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:${APP_PORT}`))
