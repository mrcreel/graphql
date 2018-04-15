const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')

const BASE_URL = `http://104.236.41.59/wp-json/wp/v2`

const typeDefs =
  `
  type Query {
    academicDepartment (id: ID!): AcademicDepartment
    academicDepartments: [AcademicDepartment!]!
    facultyMember(id: ID!): FacultyMember
    facultyMembers: [FacultyMember!]!
  }

  type AcademicDepartment {
    id: ID!
    name: String!
    slug: String!
    facultyMembers: [FacultyMember!]!
  }

  type FacultyMember {
    id: ID!
    name: String!
    slug: String!
    academicDepartment: AcademicDepartment!
  }

  `

/*

facultyMembers: [FacultyMember!]!


  */

const resolvers = {
  Query: {

  },
}

const APP_PORT = 4000
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:${APP_PORT}`))
