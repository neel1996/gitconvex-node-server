const { buildSchema } = require("graphql");

const graphqlSchemaGitDiff = new buildSchema(
  `
        type GitDiffQuery{
            gitDiffQuery(repoId: String!) : GitDiffResult
        }

        type GitDiffResult{
            gitUntrackedFiles: [String]
            gitChangedFiles: [String]
        } 

        schema{
            query: GitDiffQuery
        }
    `
);

module.exports = graphqlSchemaGitDiff;
