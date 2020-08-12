const { gitFetchFolderContentApi } = require("../../git/gitFolderDetailsApi");
const { getSelectedRepoId } = require("../common/fetchTestRepoId");

test("Test module for - gitFolderDetailsApi", async () => {
  const repoId = await getSelectedRepoId();
  const { gitFileBasedCommit, gitTrackedFiles } = await (
    await gitFetchFolderContentApi(repoId, ".")
  ).gitFolderContent;

  expect(typeof gitFileBasedCommit).toBe("object");
  expect(gitFileBasedCommit.length).toBeGreaterThan(0);

  expect(typeof gitTrackedFiles).toBe("object");
  expect(gitTrackedFiles.length).toBeGreaterThan(0);
});
