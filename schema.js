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
  console.log(`fetchResponseByURL: ${BASE_URL}${relativeURL}`)
  return fetch(`${BASE_URL}${relativeURL}/?per_page=100`).then(res => res.json());
}
/*
function fetchFacultyDepartments() {
  console.log(`fetchFacultyDepartments: ${BASE_URL}${relativeURL}`)
  return fetchResponseByURL('/faculty-department/').then(json => json.facultyDepartments);
}

function fetchFacultyDepartmentByURL(relativeURL) {
  console.log(`fetchFacultyDepartmentByURL: ${BASE_URL}${relativeURL}`)
  return fetchResponseByURL(relativeURL).then(json => json.facultyDepartment);
}
 */
const QueryType = new GraphQLObjectType({
  name: `Query`,
  description: `Base Query`,
  fields: () => ({
    allAcademicDepartments: {
      type: new GraphQLList(AcademicDepartmentType),
      resolve: (root, args) =>fetch(
        `${BASE_URL}/faculty-department/?per_page=100`)
        .then(res => res.json()),
    },
    academicDepartment: {
      type: AcademicDepartmentType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (root, args) =>fetch(
        `${BASE_URL}/faculty-department/${args.id}/?per_page=100`)
        .then(res => res.json()),
    },
  }),
})

const AcademicDepartmentType = new GraphQLObjectType({
  name: 'AcademicDepartment',
  description: 'Academic Department',
  fields: () => ({
    id: {type: GraphQLInt},
    name: { type: GraphQLString, },
    slug: { type: GraphQLString, },
  })
})

module.exports = new GraphQLSchema(
  {
  query: QueryType,
  }
)
