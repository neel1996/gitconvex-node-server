const fs = require("fs");
const path = require("path");
const { getRepoPath } = require("../global/fetchGitRepoPath");
const { gitFileBasedCommit } = require("../git/gitFileBasedCommit");
const { LangLine } = require("@itassistors/langline");

async function codeFileViewApi(repoId, fileName) {
  const repoPath = await getRepoPath(repoId);
  const targetFile = path.join(repoPath, fileName);
  const langData = await new LangLine().withFile(targetFile);
  let fileContent = [];

  if (langData && langData.name) {
    let fileData = await fs.promises
      .readFile(targetFile)
      .then((res) => {
        return res.toString();
      })
      .catch((err) => {
        console.log(err);
        return "";
      });

    if (fileData) {
      fileContent = fileData.split("\n");
      const commit = await gitFileBasedCommit(repoPath, targetFile);

      return {
        codeFileDetails: {
          language: langData.name,
          fileData: fileContent,
          fileCommit: commit,
        },
      };
    }
  }
}

module.exports.codeFileViewApi = codeFileViewApi;
