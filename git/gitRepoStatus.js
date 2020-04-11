const { exec } = require("child_process");
const util = require("util");
const execPromised = util.promisify(exec);

const getGitStatus = async repoPath => {
  console.log("Repo Path : " + repoPath);

  var gitRemoteData = "";
  var gitBranchList = "";
  var gitCurrentBranch = "";
  var gitRemoteHost = "";
  var gitRepoName = "";
  var gitTotalCommits = "";
  var gitLatestCommit = "";
  var gitTrackedFiles = "";

  const gitRemoteReference = [
    "github",
    "gitlab",
    "bitbucket",
    "azure",
    "codecommit"
  ];

  const currentDir = `cd ${repoPath};`;

  // Module to get git remote repo URL
  await execPromised(`${currentDir} git remote | xargs git remote get-url`)
    .then(res => {
      if (res.stderr !== "") {
        console.log(stderr);
      } else {
        gitRemoteData = res.stdout.trim();
      }
    })
    .catch(err => {
      console.log("Error GIT : " + err);
    });

  // Module to get Git actual repo name
  if (gitRemoteData !== "") {
    let tempSplitLength = gitRemoteData.split("/").length;
    gitRepoName = gitRemoteData
      .split("/")
      [tempSplitLength - 1].split(".git")[0];

    gitRemoteReference.forEach(entry => {
      if (gitRemoteData.includes(entry)) {
        gitRemoteHost = entry;
      }
    });
  }

  // Module to get all available branches
  gitBranchList = await execPromised(`${currentDir} git branch`).then(res => {
    if (!res.stderr) {
      return res.stdout;
    }
  });

  gitBranchList = gitBranchList
    .split("\n")
    .map(entry => {
      if (entry.includes("*")) {
        gitCurrentBranch = entry.trim().replace("*", "");
      }
      return entry.replace("*", "").trim();
    })
    .filter(entry => (entry !== "" ? entry : null));

  // Module to get total number of commits to current branch
  await execPromised(`${currentDir} git log --oneline | wc -l`).then(res => {
    if (res && !res.stderr) {
      gitTotalCommits = res.stdout.trim();
    }
  });

  //Module to get latest git commit

  await execPromised(`${currentDir} git log -1 --oneline`).then(res => {
    if (res && !res.stderr) {
      gitLatestCommit = res.stdout.trim();
    }
  });

  //Module to get all git tracked files

  await execPromised(
    `${currentDir} git ls-tree --full-tree --name-only -d HEAD`
  ).then(res => {
    if (res && !res.stderr) {
      gitTrackedFiles = res.stdout
        .split("\n")
        .filter(elm => (elm !== "" ? elm : undefined));
    }
  });

  const gitRepoDetails = {
    gitRemoteData,
    gitRepoName,
    gitBranchList,
    gitCurrentBranch,
    gitRemoteHost,
    gitTotalCommits,
    gitLatestCommit,
    gitTrackedFiles
  };

  console.log(gitRepoDetails);

  return gitRepoDetails;
};

module.exports.getGitStatus = getGitStatus;
