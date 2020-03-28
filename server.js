const env = require('dotenv').config()
 const healtchehck = require('./healthcheck')

 healtchehck.listen(process.env.PORT_HEALTHCHECK, (err)=>{
     if(err){
         console.log("HealthCheck API error occurred : " +err)
     }
 })