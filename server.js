const env = require("dotenv").config();
const healtchehck = require("./API/healthcheck");
const fetchRepo = require("./API/repofetchapi");
const storeRepo = require("./API/addRepo");
const gitRepo = require("./git/gitRepoAPI.js");
const gitDiffTracker = require("./git/gitDiffAPI");
const gitDiffStat = require("./git/gitFileDifferenceAPI")

healtchehck.listen(process.env.PORT_HEALTHCHECK || 5000, err => {
  if (err) {
    console.log("HealthCheck API error occurred : " + err);
  }
  console.log(
    "API HealthCheck started @ PORT : " + process.env.PORT_HEALTHCHECK
  );
});

fetchRepo.listen(process.env.PORT_FETCHREPO || 5001, err => {
  if (err) {
    console.log("FetRepo API error occurred : " + err);
  }
  console.log("API FetchRepo started @ PORT : " + process.env.PORT_FETCHREPO);
});

storeRepo.listen(process.env.PORT_ADDREPO || 5002, err => {
  if (err) {
    console.log("AddRepo API error occurred : " + err);
  }
  console.log("API AddRepo started @ PORT : " + process.env.PORT_ADDREPO);
});

gitRepo.listen(process.env.PORT_GITREPO || 5003, err => {
  if (err) {
    console.log("GitRepo API error occurred : " + err);
  }
  console.log("API GitRepo started @ PORT : " + process.env.PORT_GITREPO);
});

gitDiffTracker.listen(process.env.PORT_GITDIFF || 5004, err => {
  if (err) {
    console.log("GitDiff API error occurred : " + err);
  }
  console.log(
    "API GitDiffTracker started @ PORT : " + process.env.PORT_GITDIFF
  );
});

gitDiffStat.listen(process.env.PORT_GITDIFFSTAT || 5005, err => {
  if(err){
    console.log("GitDiffStat API error occurred : " + err);
  }
  console.log(
    "API GitDiffStat started @ PORT : " + process.env.PORT_GITDIFFSTAT
  );
})
