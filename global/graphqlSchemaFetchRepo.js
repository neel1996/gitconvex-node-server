const { buildSchema } = require("graphql");

const fetchRepoGQLSchema = new buildSchema(
  `
        type RootQuery{
            fetchRepo: String!
        }

        schema{
            query: RootQuery
        }
    `
);

module.exports = fetchRepoGQLSchema;
