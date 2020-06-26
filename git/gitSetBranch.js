const { exec } = require("child_process");
const util = require("util");

const execPromisified = util.promisify(exec);

const fetchRepopath = require("../global/fetchGitRepoPath");

const gitSetBranchApi = async (repoId, branch) => {
  return await execPromisified(
    `cd ${fetchRepopath.getRepoPath(repoId)}; git checkout ${branch}`
  ).then(({ stdout, stderr }) => {
    if (stderr) {
      return "BRANCH_SET_FAILED";
    } else {
      if (stdout) {
        console.log(stdout);
        return "BRANCH_SET_SUCCESS";
      }
    }
  });
};

module.exports.gitSetBranchApi = gitSetBranchApi;