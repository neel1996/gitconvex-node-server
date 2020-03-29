const {buildSchema} = require('graphql')

const graphqlSchema = new buildSchema(`
    type RootQuery{
        osCheck: String!
        gitCheck: String!
        nodeCheck: String!
    }

    schema{
        query: RootQuery
    }
`)

module.exports = graphqlSchema