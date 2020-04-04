const env = require("dotenv").config();
const healtchehck = require('./healthcheck');
const fetchRepo = require('./repofetchapi')

healtchehck.listen(process.env.PORT_HEALTHCHECK || 5000, err => {
  if (err) {
    console.log("HealthCheck API error occurred : " + err);
  }
  console.log("API HealthCheck started @ PORT : " +process.env.PORT_HEALTHCHECK);
});

fetchRepo.listen(process.env.PORT_FETCHREPO || 5001, err=>{
  if(err){
    console.log("FetRepo API error occurred : " +err)
  }
  console.log("API FetchRepo started @ PORT : " +process.env.PORT_FETCHREPO);
})