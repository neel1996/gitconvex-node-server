# gitconvex node js project
This is the front end node js source for the [gitconvex](https://github.com/neel1996/gitconvex-package) project.

![gitconvex-nodejs](https://user-images.githubusercontent.com/47709856/87227374-23c91180-c3b8-11ea-80a9-4ff0e9fcb1ec.png)

## Dependencies

The depedency packages used by this project can be found [here](https://github.com/neel1996/gitconvex-server/network/dependencies)

- **Server API** - The project uses [GraphQL](https://github.com/graphql) API for handling client requests. The graphiql console is enabled which allows direct API invokation by accessing the API endpoints
- **Command Line Process** - [child_process](https://nodejs.org/api/child_process.html) is used for executing git commands in the back end

### Guidelines 

Fork the repo and raise a new Pull Request to merge your branch with the `development` branch of this repo. Once the review is complete, the PR will be approved and merged with `master`

## Project directory tree

```
├── API
│   ├── addRepoApi.js
│   ├── deleteRepoApi.js
│   ├── fetchRepoApi.js
│   ├── healthcheckApi.js
│   └── settingsApi.js
├── LICENSE
├── README.md
├── database
│   └── repo-datastore.json
├── env_config.json
├── git
│   ├── gitAddBranchApi.js
│   ├── gitAddRemoteApi.js
│   ├── gitBranchDeleteApi.js
│   ├── gitCommitChangesAPI.js
│   ├── gitCommitFilesApi.js
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
├── jsConfig.json
├── package.json
├── server.js
└── tests
    ├── addRepoApi.test.js
    ├── deleteRepoApi.test.js
    ├── fetchRepoApi.test.js
    └── healthCheckApi.test.js
    
```

