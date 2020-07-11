# gitconvex node js project
This is the front end node js source for the [gitconvex](https://github.com/neel1996/gitconvex-package) project.

![gitconvex-nodejs](https://user-images.githubusercontent.com/47709856/87227374-23c91180-c3b8-11ea-80a9-4ff0e9fcb1ec.png)

## Dependencies

The depedency packages used by this project can be found [here](https://github.com/neel1996/gitconvex-server/network/dependencies)

- **Server API** - The project uses [GraphQL](https://github.com/graphql) API for handling client requests. The graphiql console is enabled which allows direct API invokation by accessing the API endpoints
- **Command Line Process** - [child_process](https://nodejs.org/api/child_process.html) is used for executing git commands in the back end

```
## Project directory tree

├── API
│   ├── addRepoApi.js
│   ├── deleteRepoApi.js
│   ├── fetchRepoApi.js
│   ├── healthcheckApi.js
│   └── settingsApi.js
├── LICENSE
├── database
│   └── repo-datastore.json
├── env_config.json
├── git
│   ├── gitAddBranchApi.js
│   ├── gitAddRemoteApi.js
│   ├── gitCommitChangesAPI.js
│   ├── gitCommitLogsAPI.js
│   ├── gitFetchPullApi.js
│   ├── gitFileDifferenceAPI.js
│   ├── gitGetStagedFilesAPI.js
│   ├── gitGetUnpushedCommits.js
│   ├── gitPushToRemoteAPI.js
│   ├── gitRemoveStagedItems.js
│   ├── gitRepoAPI.js
│   ├── gitRepoStatus.js
│   ├── gitSetBranch.js
│   ├── gitStageAllItemsAPI.js
│   ├── gitStageItem.js
│   └── gitTrackedDiff.js
├── global
│   ├── envConfigReader.js
│   ├── fetchGitRepoPath.js
│   ├── globalAPIHandler.js
│   ├── globalFunctionStore.js
│   ├── globalRouteStore.js
│   └── gqlGlobalAPISchema.js
├── package.json
└── server.js

```
## Contribute!

If you are interested in contributing to the project, fork the repo, submit a PR. Currently its just a insgle dev working on the project. Hopefully will get couple more on board to maintain the repo