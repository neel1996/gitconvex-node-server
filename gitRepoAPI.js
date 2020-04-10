const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get("/gitrepodetails", (req, res) => {

    const repoId = req.body.repoId;

})

function getRepoPath(repoId) {
    const dataEntry = fs.readFileSync('./database/repo-datastore.json');
    
    const repoObject = JSON.parse(dataEntry);
    var repoPath = ""

    repoObject.forEach((entry) => {
        let keys = Object.keys(entry)

        if(entry.id === repoId)
        {
            repoPath = entry.path
        }
    })

    return repoPath;
}