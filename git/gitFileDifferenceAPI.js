const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const fetchRepopath = require("../global/fetchGitRepoPath");
const { exec } = require("child_process");
const util = require("util");
const execPromisified = util.promisify(exec);

app.post("/fetchgitfiledifference", async (req, res) => {
  const { repoId, fileName } = req.body;

  if (repoId && fileName) {
    var differencePayload = await getGitFileDifference(repoId, fileName);

    res.json({
      differencePayload,
    });
  }
});

async function getGitFileDifference(repoId, fileName) {
  const repoPath = fetchRepopath.getRepoPath(repoId);
  return await execPromisified(
    `cd ${repoPath}; git diff --stat ${fileName} && echo "SPLIT___LINE" && git diff -U$(wc -l ${fileName})`
  ).then((res) => {
    const { stdout, stderr } = res;

    if (stdout && !stderr) {
      var splitLines = stdout.split("SPLIT___LINE");
      var diffStat = splitLines[0].trim().split("\n");
      var fileDiff = splitLines[1].trim().split("\n");

      return {
        diffStat,
        fileDiff,
      };
    }
  });
}

module.exports = app;
