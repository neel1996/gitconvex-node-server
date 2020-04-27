const { buildSchema } = require("graphql");

const gqlSchemaRepoStatus = new buildSchema(
  `
        type GetRepoStatusQuery{
            getRepoStatus(repoId: String!) : RepoStatus
        }

        type RepoStatus{
            gitRemoteData: String
            gitRepoName: String
            gitBranchList: [String]
            gitCurrentBranch: String
            gitRemoteHost: String
            gitTotalCommits: Int
            gitLatestCommit: String
            gitTrackedFiles: [String]
            gitFileBasedCommit: [String]
            gitTotalTrackedFiles: Int
        }

        schema{
            query: GetRepoStatusQuery
        }
    `
);

module.exports = gqlSchemaRepoStatus;
