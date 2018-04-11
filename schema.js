const graphql = require('graphql')
const fetch = require('node-fetch')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')

const BASE_URL = `http://104.236.41.59/wp-json/wp/v2`

const AcademicDepartmentType = new GraphQLObjectType({
    name: 'AcademicDepartment',
    description: 'Academic Department',
    fields: () => ({
      id: { type: GraphQLInt, },
      name: { type: GraphQLString, },
      slug: { type: GraphQLString, },
    })
  })

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'Query',
    fields: () => ({
      AcademicDepartment: {
        type: AcademicDepartmentType,
        args: {
          id: { type: GraphQLInt }
        },
      resolve: (root, args) => fetch(
        `${BASE_URL}/faculty-department/${args.id}`
      )
      .then(res => res.json())
      },
    })
  })
})