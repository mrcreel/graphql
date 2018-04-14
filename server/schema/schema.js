const {
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require('graphql')

const fetch = require('node-fetch')

const BASE_URL = `http://104.236.41.59/wp-json/wp/v2`

function fetchResponseByURL(relativeURL) {
  console.log(`${BASE_URL}${relativeURL}/?per_page=100`)
  return `${BASE_URL}${relativeURL}/?per_page=100`
}

const AcademicDepartmentType = new GraphQLObjectType({
  name: 'AcademicDepartment',
  description: 'Academic Department',
  fields: () => ({
    id: {type: GraphQLID},
    name: { type: GraphQLString, },
    slug: { type: GraphQLString, },
  })
})

const FacultyMemberType = new GraphQLObjectType({
  name: 'FacultyMember',
  description: 'Faculty Member',
  fields: () => ({
    id: {type: GraphQLID},
    name: {
      type: GraphQLString,
      resolve: node => node.title.rendered,
    },
    slug: { type: GraphQLString, },
    academicDepartmentId:{
      type: GraphQLInt,
      //Need to escape the hyphen in the JSON property
      resolve: node => node['faculty-department'][0],
    },
    academicDepartment:{
      type: AcademicDepartmentType,
      
    },
  })
})

const QueryType = new GraphQLObjectType({
  name: `Query`,
  description: `Base Query`,
  fields: () => ({
    academicDepartment: {
      type: AcademicDepartmentType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (root, args) =>fetch(
        fetchResponseByURL(`/faculty-department/${args.id}`)
      )
      .then(res => res.json()),
    },
    academicDepartments: {
      type: new GraphQLList(AcademicDepartmentType),
      description: `List of all Academic Departments`,
      resolve: (root, args) =>fetch(
        fetchResponseByURL(`/faculty-department`)
      )
      .then(res => res.json()),
    },
    facultyMember: {
      type: FacultyMemberType,
      description: `Query for a Faculty Member by ID `,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (root, args) =>fetch(
        fetchResponseByURL(`/faculty/${args.id}`)
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
