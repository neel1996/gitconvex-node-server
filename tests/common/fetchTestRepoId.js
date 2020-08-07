const { fetchRepoHandler } = require("../../API/fetchRepoApi");

async function getSelectedRepoId() {
  const fetchResults = await fetchRepoHandler().then((res) => res);
  repoIdList = await fetchResults.repoName.map((name, index) => {
    if (name === "JEST_REPO") {
      return fetchResults.repoId[index];
    } else {
      return null;
    }
  });

  let selectedId = repoIdList.find((item) => {
    if (item) {
      return item;
    }
  });

  return selectedId;
}

module.exports.getSelectedRepoId = getSelectedRepoId;
