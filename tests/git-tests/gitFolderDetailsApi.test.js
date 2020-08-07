const { gitFetchFolderContentApi } = require("../../git/gitFolderDetailsApi");
const { getSelectedRepoId } = require("../common/fetchTestRepoId");

test("Test module for - gitFolderDetailsApi", async () => {
  const { gitFileBasedCommit, gitTrackedFiles } = await (
    await gitFetchFolderContentApi(await getSelectedRepoId(), "")
  ).gitFolderContent;

  expect(typeof gitFileBasedCommit).toBe("object");
  expect(gitFileBasedCommit.length).toBeGreaterThan(0);

  expect(typeof gitTrackedFiles).toBe("object");
  expect(gitTrackedFiles.length).toBeGreaterThan(0);
});
