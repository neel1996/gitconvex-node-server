const { deleteRepoApi } = require("../API/deleteRepoApi");
const { getSelectedRepoId } = require("./common/fetchTestRepoId");

describe("Test module for - deleteRepoApi", () => {
  it("Tests repo deletion scenario", async () => {
    const { status } = await deleteRepoApi(await getSelectedRepoId());

    expect(status).toBe("DELETE_SUCCESS");
  });
});
