const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const {
  HEALTH_CHECK,
  FETCH_REPO,
  ADD_REPO,
  REPO_DETAILS,
  REPO_TRACKED_DIFF,
  REPO_FILE_DIFF,
  COMMIT_LOGS,
  GIT_STAGED_FILES,
} = require("./globalRouteStore");

const graphqlHTTP = require("express-graphql");

const globalGQLSchema = require("../global/gqlGlobalAPISchema");

const {
  addRepoFunction,
  fetchRepoFunction,
  gitChangeTrackerFunction,
  gitFileDiffFunction,
  healthCheckFunction,
  repoDetailsFunction,
  gitCommitLogsFunction,
  gitGetStagedFiles,
} = require("./globalFunctionStore");

app.use(
  "/gitconvexapi",
  graphqlHTTP({
    schema: globalGQLSchema,
    graphiql: true,
    rootValue: {
      gitConvexApi: async (args) => {
        const { route, payload } = args;

        console.log("Api Route : " + route + "\nAPI Payload : " + payload);

        let parsedPayload = {};

        if (payload) {
          parsedPayload = JSON.parse(JSON.stringify(payload));
        }

        switch (route) {
          case HEALTH_CHECK:
            return healthCheckFunction();
          case FETCH_REPO:
            return fetchRepoFunction();
          case ADD_REPO:
            return addRepoFunction(parsedPayload);
          case REPO_DETAILS:
            return repoDetailsFunction(parsedPayload);
          case REPO_TRACKED_DIFF:
            return gitChangeTrackerFunction(parsedPayload);
          case REPO_FILE_DIFF:
            return gitFileDiffFunction(parsedPayload);
          case COMMIT_LOGS:
            return gitCommitLogsFunction(parsedPayload);
          case GIT_STAGED_FILES:
            return gitGetStagedFiles(parsedPayload);
          default:
            return { message: "Query Termination" };
        }
      },
    },
  })
);

module.exports = app;
