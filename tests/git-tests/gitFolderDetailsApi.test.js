const { gitFetchFolderContentApi } = require("../../git/gitFolderDetailsApi");
const { fetchRepoHandler } = require("../../API/fetchRepoApi");

test("Test module for - gitFolderDetailsApi", async () => {
  const fetchResults = await fetchRepoHandler().then((res) => res);
  repoIdList = await fetchResults.repoName.map((name, index) => {
    if (name === "JEST_REPO") {
      return fetchResults.repoId[index];
    } else {
      return null;
    }
  });

  let selectedId = "";

  repoIdList.forEach((item) => {
    if (item) {
      selectedId = item;
    }
  });

  const { gitFileBasedCommit, gitTrackedFiles } = await (
    await gitFetchFolderContentApi(selectedId, "")
  ).gitFolderContent;

  expect(typeof gitFileBasedCommit).toBe("object");
  expect(gitFileBasedCommit.length).toBeGreaterThan(0);

  expect(typeof gitTrackedFiles).toBe("object");
  expect(gitTrackedFiles.length).toBeGreaterThan(0);
});
