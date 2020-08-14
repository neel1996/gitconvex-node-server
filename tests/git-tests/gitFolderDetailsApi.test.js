const { gitFetchFolderContentApi } = require("../../git/gitFolderDetailsApi");
const { getSelectedRepoId } = require("../common/fetchTestRepoId");

test("Test module for - gitFolderDetailsApi", async () => {
  const repoId = await getSelectedRepoId();
  const { gitFolderContent } = await gitFetchFolderContentApi(repoId, ".");
  const { gitFileBasedCommit, gitTrackedFiles } = gitFolderContent;

  expect(typeof gitFileBasedCommit).toBe("object");
  expect(gitFileBasedCommit.length).toBeGreaterThan(0);

  expect(typeof gitTrackedFiles).toBe("object");
  expect(gitTrackedFiles.length).toBeGreaterThan(0);
});
