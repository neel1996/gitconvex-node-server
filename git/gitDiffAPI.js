const express = require("express");
const app = express();
const cors = require("cors");
const graphHTTP = require("express-graphql");
const { exec } = require("child_process");
const util = require("util");
const execPromosified = util.promisify(exec);
const fetchRepoPath = require("../global/fetchGitRepoPath");
const graphqlSchema = require("../global/gqlSchemaRepoFileDiff");

app.use(cors());

app.use(
  "/fetchgitdiff",
  graphHTTP({
    schema: graphqlSchema,
    rootValue: {
      gitDiffQuery: (args) => {
        console.log("GQL Args : " + JSON.stringify(args));
        const { repoId } = args;
        const repoPath = fetchRepoPath.getRepoPath(repoId);

        var responseObject = {
          gitChangedFiles: getGitDiff(repoPath),
          gitUntrackedFiles: getUntrackedFiles(repoPath),
        };

        return responseObject;
      },
    },
    graphiql: true,
  })
);

async function getGitDiff(repoPath) {
  return await execPromosified(`cd ${repoPath}; git diff --raw`).then((res) => {
    const { stdout, stderr } = res;
    var parsedEntry = stdout.trim().split("\n");

    var gitDifference = parsedEntry.map((entry) => {
      if (entry.split(/\s+/)) {
        let splitEntry = entry.split(/\s+/);
        if (splitEntry[4] && splitEntry[5]) {
          return "" + splitEntry[4] + "," + splitEntry[5];
        }
      }
    });

    return gitDifference.filter((entry) => (entry ? entry : ""));
  });
}

async function getUntrackedFiles(repoPath) {
  return await execPromosified(
    `cd ${repoPath}; git ls-files --others --exclude-standard`
  ).then((res) => {
    const { stdout, stderr } = res;
    var parsedEntry = stdout
      .trim()
      .split("\n")
      .filter((item) => {
        if (item) {
          return item;
        }
      });

    var gitUntrackedFiles = parsedEntry.map((entry) => {
      let fileDirArray = [];
      if (entry.includes("/")) {
        let splitEntry = entry.split("/");
        let dirEntry = splitEntry.map((elm, index) => {
          if (index < entry.split("/").length - 1) {
            return elm;
          }
        });
        return `${dirEntry.join("/")},${splitEntry[splitEntry.length - 1]}`;
      } else {
        return `NO_DIR,${entry}`;
      }
    });
    return gitUntrackedFiles;
  });
}

module.exports = app;
