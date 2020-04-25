const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");

const getGitStatus = require("./git/gitRepoStatus").getGitStatus;

app.use(express.json());
app.use(cors());

app.get("/gitrepostatus", async (req, res) => {
  const repoId = req.query.repoId;
  const repoPath = getRepoPath(repoId);

  const repoDetails = getGitStatus(repoPath).then(result => {
    if (result) {
      res.json(result).status(201);
    }
  });

  console.log("Received REPO DETAILS : " + repoDetails);
});

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
