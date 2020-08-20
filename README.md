# gitconvex node js project
This is the front end node js source for the [gitconvex](https://github.com/neel1996/gitconvex-package) project.

![gitconvex-nodejs](https://user-images.githubusercontent.com/47709856/87227374-23c91180-c3b8-11ea-80a9-4ff0e9fcb1ec.png)

## Dependencies

The depedency packages used by this project can be found [here](https://github.com/neel1996/gitconvex-server/network/dependencies)

- **Server API** - The project uses [GraphQL](https://github.com/graphql) API for handling client requests. The graphiql console is enabled which allows direct API invokation by accessing the API endpoints
- **Command Line Process** - [child_process](https://nodejs.org/api/child_process.html) is used for executing git commands in the back end
- **File system watcher** - [chokidar](https://www.npmjs.com/package/chokidar) is used for listening to git related changes in the configured repos. This was included from `v1.1.4` to enable effective commit log crawling 
- **SQLite** - [sqlite3](https://www.npmjs.com/package/sqlite3) is used for storing commit logs to enable commit log searching. The commit logs are stored in a file based Database to enable commit log searching for repos of all scale. 
  
***story behind it***- For testing, we used `flutter` official repo which has over 20,000 commits and picking an expected commit log from 20k commits will not be possible using normal git commands behind the scenes. This is why we went with sqlite for storing all commits initially when the repo is setup and incremental crwals are run to insert new commits whenever they are added to all the configured repos.

### Guidelines 

Fork the repo and raise a new Pull Request to merge your branch with the `development` branch of this repo. Once the review is complete, the PR will be approved and merged with `master`

## Project directory tree

**API** - All the common node modules which does not rely on `git` in anyway resides in this direcotry

**git** - The scripts in this directory will handle all the git based operations behind the scenes using `child_process` behind the scenes to tap into the command line and execute git commands

**global** - The GQL schema and other scripts which are used for enabling GQL based communication are included in this directory. Some modules commonly used across all the scripts in the repo will also reside here

**tests** - As the name suggests, all the test scripts are stored here

**utils** - The common utility modules which are required by other scripts in the repo are stored here

```
├── API
│   ├── addRepoApi.js
│   ├── commitLogSearchApi.js
│   ├── deleteRepoApi.js
│   ├── fetchRepoApi.js
│   ├── healthcheckApi.js
│   └── settingsApi.js
├── README.md
├── git
│   ├── gitAddBranchApi.js
│   ├── gitAddRemoteApi.js
│   ├── gitBranchDeleteApi.js
│   ├── gitCommitChangesAPI.js
│   ├── gitCommitFilesApi.js
│   ├── gitCommitLogSearchApi.js
│   ├── gitCommitLogsAPI.js
│   ├── gitFetchPullApi.js
│   ├── gitFileDifferenceAPI.js
│   ├── gitFolderDetailsApi.js
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
├── prettier.config.js
├── server.js
├── tests
│   ├── addRepoApi.test.js
│   ├── common
│   │   └── fetchTestRepoId.js
│   ├── deleteRepoApi.test.js
│   ├── fetchRepoApi.test.js
│   ├── git-tests
│   │   ├── gitAddBranchApi.test.js
│   │   ├── gitBranchDeleteApi.test.js
│   │   └── gitFolderDetailsApi.test.js
│   ├── global-tests
│   │   └── fetchGitRepoPath.test.js
│   └── healthCheckApi.test.js
└── utils
    ├── getEnvData.js
    ├── repoChangeListener.js
    └── sqliteDbAccess.js
    
```

