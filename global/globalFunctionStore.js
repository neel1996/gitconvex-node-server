const { healthCheckHandler } = require("../API/healthcheckApi");
const { fetchRepoHandler } = require("../API/fetchRepoApi");
const { addRepoHandler } = require("../API/addRepoApi");
const { getGitRepoStatus } = require("../git/gitRepoAPI");
const { gitTrackedDiff } = require("../git/gitTrackedDiff");
const { gitFileDifferenceHandler } = require("../git/gitFileDifferenceAPI");

module.exports.healthCheckFunction = healthCheckFunction = async (payload) => {
  const hcPayload = await healthCheckHandler().then((res) => res);
  const { osCheck, gitCheck, nodeCheck } = JSON.parse(
    JSON.stringify(hcPayload)
  );
  return {
    healthCheck: {
      osCheck,
      gitCheck,
      nodeCheck,
    },
  };
};

module.exports.fetchRepoFunction = fetchRepoFunction = async (payload) => {
  const repoFetchPayload = await fetchRepoHandler().then((res) => res);

  const { repoId, repoName, repoPath } = repoFetchPayload;

  console.log(repoFetchPayload);

  return {
    fetchRepo: {
      repoId,
      repoName,
      repoPath,
    },
  };
};

module.exports.addRepoFunction = addRepoFunction = async (parsedPayload) => {
  const { repoName, repoPath } = JSON.parse(parsedPayload);
  if (repoName && repoPath) {
    return addRepoHandler(repoName, repoPath);
  } else {
    return {
      message: "REPO_WRITE_FAILURE",
    };
  }
};

module.exports.repoDetailsFunction = repoDetailsFunction = async (
  parsedPayload
) => {
  const repoDetails = await getGitRepoStatus(JSON.parse(parsedPayload).repoId);
  return {
    gitRepoStatus: {
      ...repoDetails,
    },
  };
};

module.exports.gitChangeTrackerFunction = gitChangeTrackerFunction = async (
  parsedPayload
) => {
  let { repoId } = JSON.parse(parsedPayload);
  const gitChangeResults = await gitTrackedDiff(repoId);
  return {
    gitChanges: {
      ...gitChangeResults,
    },
  };
};

module.exports.gitFileDiffFunction = gitFileDiffFunction = async (
  parsedPayload
) => {
  let fileDiffArgs = JSON.parse(parsedPayload);
  const gitFileLineChanges = await gitFileDifferenceHandler(
    fileDiffArgs.repoId,
    fileDiffArgs.fileName
  ).then((res) => res);
  console.log(gitFileLineChanges);
  return {
    gitFileLineChanges: { ...gitFileLineChanges },
  };
};
