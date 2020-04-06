const env = require("dotenv").config();
const healtchehck = require("./healthcheck");
const fetchRepo = require("./repofetchapi");
const storeRepo = require("./addRepo");

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
