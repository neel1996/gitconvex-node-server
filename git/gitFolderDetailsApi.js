const { exec } = require("child_process");
const fs = require("fs");
const util = require("util");
const execPromised = util.promisify(exec);
const fetchRepopath = require("../global/fetchGitRepoPath");
const path = require("path");

const gitFetchFolderContentApi = async (repoId, directoryName) => {
  const repoPath = fetchRepopath.getRepoPath(repoId);
  const targetPath = path.join(repoPath, directoryName);

  let folderContent = await fs.promises
    .readdir(targetPath)
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      return [];
    });

  let filteredContent = folderContent.map(async (item) => {
    return await fs.promises
      .stat(path.join(targetPath, item))
      .then((content) => {
        if (content.isFile()) {
          return `${item}: File`;
        } else if (content.isDirectory()) {
          return `${path.join(directoryName, item)}: directory`;
        } else {
          return `${item}: File`;
        }
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  });

  let gitCommits = folderContent.map(async (item, index) => {
    return await execPromised(
      `git log -1 --oneline "${directoryName + "/" + item}"`,
      {
        windowsHide: true,
        cwd: repoPath,
      }
    )
      .then(({ stdout, stderr }) => {
        if (stdout) {
          return stdout.trim();
        } else {
          console.log(stderr);
          filteredContent[index] = undefined;
          return "";
        }
      })
      .catch((err) => {
        console.log(err);
        filteredContent[index] = undefined;
        return "";
      });
  });

  filteredContent = filteredContent.filter((item) => {
    if (item) {
      return true;
    } else {
      return false;
    }
  });

  gitCommits = gitCommits.filter((item) => {
    if (item) {
      return true;
    } else {
      return false;
    }
  });

  console.log(filteredContent);
  console.log(gitCommits);

  return {
    gitFolderContent: {
      gitTrackedFiles: filteredContent,
      gitFileBasedCommit: gitCommits,
    },
  };
};

module.exports.gitFetchFolderContentApi = gitFetchFolderContentApi;
