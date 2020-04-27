const fs = require("fs");
const graphqlHTTP = require("express-graphql");
const express = require("express");
const app = express();
const cors = require("cors");

const gqlSchema = require("./global/gqlSchemaRepoStatus");

const getGitStatus = require("./git/gitRepoStatus").getGitStatus;

app.use(express.json());
app.use(cors());

app.use(
  "/gitrepostatus",
  graphqlHTTP({
    schema: gqlSchema,
    rootValue: {
      getRepoStatus: args => {
        const repoId = args.repoId;
        const repoPath = getRepoPath(repoId);

        const repoDetails = getGitStatus(repoPath).then(result => {
          if (result) {
            // res.json(result).status(201);
            return result
          }
        });

        console.log("Received REPO DETAILS : " + repoDetails);

        return repoDetails
      }
    },
    graphiql: true
  })
);

function getRepoPath(repoId) {
  const dataEntry = fs
    .readFileSync("./database/repo-datastore.json")
    .toString();

  const repoObject = JSON.parse(dataEntry);
  var repoPath = "";

  repoObject.forEach(entry => {
    let keys = Object.keys(entry);

    if (entry.id == repoId) {
      repoPath = entry.repoPath;
    }
  });

  return repoPath;
}

module.exports = app;
