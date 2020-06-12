const { buildSchema, GraphQLString } = require("graphql");

const globalAPISchema = new buildSchema(
  `
        type GitConvexAPI{
            gitConvexApi(route: String!, payload: String) : GitConvexResults!
        }

        type GitConvexResults{
            healthCheck: healthCheckResults!
            fetchRepo: fetchRepoResults!
            addRepo: addRepoResults!
            gitRepoStatus: gitRepoStatusResults!
            gitChanges: gitChangeResults!
            gitFileLineChanges: gitFileLineChangeResults!
            gitCommitLogs: gitCommitLogResults!
        }

        type healthCheckResults{
            osCheck: String!
            gitCheck: String!
            nodeCheck: String!
        }

        type fetchRepoResults{
            repoId: [String]
            repoPath: [String]
            repoName: [String]
        }

        type addRepoResults{
            message: String
        }

        type gitCommits{
            hash: String,
            author: String,
            commitTime: String,
            commitMessage: String,
        }

        type gitCommitLogResults{
            commits: [gitCommits]
        }

        type gitRepoStatusResults{
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
        
        type gitChangeResults{
            gitUntrackedFiles: [String]
            gitChangedFiles: [String]
        }

        type gitFileLineChangeResults{
            diffStat: [String]
            fileDiff: [String]
        }

        schema{
            query: GitConvexAPI
        }

    `
);

module.exports = globalAPISchema;
