const { getSelectedRepoId } = require("./common/fetchTestRepoId");
const { commitCompareApi } = require("../API/commitCompareApi");

describe("Test module for commitCompareApi", () => {
  const baseCommit = "90d84a8";
  const compareCommit = "f0dfea0";

  test("commitCompareApi - positive scenario", async () => {
    const repoId = await getSelectedRepoId();
    const result = await commitCompareApi(repoId, baseCommit, compareCommit);

    expect(result.message).toBeFalsy();
    expect(result.difference).toBeTruthy();
  });

  test("commitCompareApi - negative scenario", async () => {
    const repoId = await getSelectedRepoId();
    const result = await commitCompareApi(repoId, "DUMMY", "DUMMY_1");

    expect(result.message).toBeTruthy();
  });
});
