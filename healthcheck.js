const express = require('express')
const app = express();
const {exec} = require('child_process')

app.get('/healthcheck', (req,res)=>{
    exec("uname -a", (err, stdout, stderr)=> {
        if(err)
        {
            console.log(err)
            res.json({
                "message": "HC_ERROR",
                "err_log": err
            })
        }
        else{
            console.log(stdout)
        }
    })
})

module.exports = app