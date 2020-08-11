const { gitDeleteBranchApi } = require("../../git/gitBranchDeleteApi");
const { getSelectedRepoId } = require("../common/fetchTestRepoId");
const { gitSetBranchApi } = require("../../git/gitSetBranch");

const testBranch = "JEST_TEST_BRANCH";

describe("test module for - gitBranchDeleteApi", async () => {
  test("positive test case for gitBranchDeleteApi", async () => {
    const repoId = await getSelectedRepoId();
    await gitSetBranchApi(repoId, "master");

    const addBranchResult = await gitDeleteBranchApi(repoId, testBranch, true);

    expect(addBranchResult).toBeTruthy();
    expect(addBranchResult.status).toBe("BRANCH_DELETE_SUCCESS");
  });

  test("negative test case for gitAddBranchApi", async () => {
    const repoId = await getSelectedRepoId();
    const addBranchResult = await gitDeleteBranchApi(repoId, ",./\\", true);

    expect(addBranchResult).toBeTruthy();
    expect(addBranchResult.status).toBe("BRANCH_DELETE_FAILED");
  });
});
