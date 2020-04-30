const fs = require("fs");
const graphqlHTTP = require("express-graphql");
const express = require("express");
const app = express();
const cors = require("cors");

const gqlSchema = require("../global/gqlSchemaRepoStatus");

const getGitStatus = require("./gitRepoStatus").getGitStatus;
const fetchRepoPath = require("../global/fetchGitRepoPath");

app.use(express.json());
app.use(cors());

app.use(
  "/gitrepostatus",
  graphqlHTTP({
    schema: gqlSchema,
    rootValue: {
      getRepoStatus: args => {
        const repoId = args.repoId;
        const repoPath = fetchRepoPath.getRepoPath(repoId);

        const repoDetails = getGitStatus(repoPath).then(result => {
          if (result) {
            return result;
          }
        });

        console.log("Received REPO DETAILS : " + repoDetails);

        return repoDetails;
      }
    },
    graphiql: true
  })
);

module.exports = app;
