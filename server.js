const env = require("dotenv").config();
const healtchehck = require("./healthcheck");

healtchehck.listen(process.env.PORT_HEALTHCHECK || 5000, err => {
  if (err) {
    console.log("HealthCheck API error occurred : " + err);
  }
  console.log("API HealthCheck started @ PORT : " +process.env.PORT_HEALTHCHECK);
});
