const {GraphQLServer,} = require('graphql-yoga')

const fetch = require('node-fetch')

const typeDefs =
  `
  type Query {
    academicDepartment (id: ID!): AcademicDepartment
    academicDepartments: [AcademicDepartment!]!

    facultyMember (id: ID!): FacultyMember
    facultyMembers: [FacultyMember!]!

    departmentFacultyMember (id: ID!, departmentId: ID!): DepartmentFacultyMember
    departmentFacultyMembers: [DepartmentFacultyMember!]!
  }

  type FacultyMember {
    id: ID!
    slug: String!
    name: String!
  }

  type AcademicDepartment {
    id: ID!
    name: String!
    slug: String!
    departmentFacultyMembers: [DepartmentFacultyMember!]!
  }

  type DepartmentFacultyMember {
    id: ID!
    departmentId: ID!
    slug: String!
  }
`

const BASE_URL = `http://104.236.41.59/wp-json/wp/v2`

const resolvers = {
  Query: {
    academicDepartment: (root, args) => {
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

    facultyMember: (root, args) => {
      return (
        fetch(`${BASE_URL}/faculty/${args.id}?per_page=100`)
      )
      .then(res => res.json())
    },

    facultyMembers: () => {
      return (
        fetch(`${BASE_URL}/faculty/?per_page=100`)
      )
      .then(res => res.json())
    },

    departmentFacultyMember: (root, args) => {

    },

  },

  FacultyMember:{
    name: (root) => root.title.rendered
  },


}

const APP_PORT = 4000

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:${APP_PORT}`))

/*
killall -9 node
*/
