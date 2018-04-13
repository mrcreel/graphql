const {
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql')

const fetch = require('node-fetch')

const BASE_URL = `http://104.236.41.59/wp-json/wp/v2`

function fetchResponseByURL(relativeURL) {
  return `${BASE_URL}${relativeURL}/?per_page=100`
}

const AcademicDepartmentType = new GraphQLObjectType({
  name: 'AcademicDepartment',
  description: 'Academic Department',
  fields: () => ({
    id: {type: GraphQLInt},
    name: { type: GraphQLString, },
    slug: { type: GraphQLString, },
  })
})

const QueryType = new GraphQLObjectType({
  name: `Query`,
  description: `Base Query`,
  fields: () => ({
    allAcademicDepartments: {
      type: new GraphQLList(AcademicDepartmentType),
      resolve: (root, args) =>fetch(
        fetchFacultyDepartments()
      )
      .then(res => res.json()),
    },
    academicDepartment: {
      type: AcademicDepartmentType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (root, args) =>fetch(
        fetchResponseByURL(`/faculty-department/${args.id}/`)
      )
      .then(res => res.json()),
    },
  }),
})



module.exports = new GraphQLSchema(
  {
  query: QueryType,
  }
)
