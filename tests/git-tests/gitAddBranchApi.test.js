const { gitAddBranchApi } = require("../../git/gitAddBranchApi");
const { getSelectedRepoId } = require("../common/fetchTestRepoId");

const testBranch = "JEST_TEST_BRANCH";

describe("test module for - gitAddBranchApi", () => {
  test("positive test case for gitAddBranchApi", async () => {
    const repoId = await getSelectedRepoId();
    const addBranchResult = await gitAddBranchApi(repoId, testBranch);

    expect(addBranchResult).toBeTruthy();
    expect(addBranchResult).toBe("BRANCH_CREATION_SUCCESS");
  });

  test("negative test case for gitAddBranchApi", async () => {
    const repoId = await getSelectedRepoId();
    const addBranchResult = await gitAddBranchApi(repoId, ",./\\");

    expect(addBranchResult).toBeTruthy();
    expect(addBranchResult).toBe("BRANCH_ADD_FAILED");
  });
});
