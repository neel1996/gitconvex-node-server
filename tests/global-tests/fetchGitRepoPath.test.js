const { getRepoPath } = require("../../global/fetchGitRepoPath");
const { getSelectedRepoId } = require("../common/fetchTestRepoId");

test("Test module for - fetchRepoPath API", async () => {
  const repopath = await getRepoPath(await getSelectedRepoId());

  expect(repopath).toBeTruthy();
  expect(typeof repopath).toBe("string");
});
