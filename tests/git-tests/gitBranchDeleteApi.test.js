const { gitDeleteBranchApi } = require("../../git/gitBranchDeleteApi");
const { gitAddBranchApi } = require("../../git/gitAddBranchApi");
const { getSelectedRepoId } = require("../common/fetchTestRepoId");
const { gitSetBranchApi } = require("../../git/gitSetBranch");

const testBranch = "JEST_TEST_BRANCH";

describe("test module for - gitBranchDeleteApi", () => {
  test("positive test case for gitBranchDeleteApi", async () => {
    const repoId = await getSelectedRepoId();
    const addBranchStatus = await gitAddBranchApi(repoId, testBranch);
    const setBranchStatus = await gitSetBranchApi(repoId, "master");

    const deleteBranchResult = await gitDeleteBranchApi(
      repoId,
      testBranch,
      true
    );

    expect(deleteBranchResult).toBeTruthy();
    expect(deleteBranchResult.status).toBe("BRANCH_DELETE_SUCCESS");
  });

  test("negative test case for gitAddBranchApi", async () => {
    const repoId = await getSelectedRepoId();
    const deleteBranchResult = await gitDeleteBranchApi(repoId, ",./\\", true);

    expect(deleteBranchResult).toBeTruthy();
    expect(deleteBranchResult.status).toBe("BRANCH_DELETE_FAILED");
  });
});
