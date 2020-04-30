const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/addrepo", (req, res) => {
  const timeStamp = new Date().toUTCString();
  const id = new Date().getTime();

  const repoName = req.body.repoName;
  const repoPath = req.body.repoPath;

  var repoObject = {
    id,
    timeStamp,
    repoName,
    repoPath
  };
  const dataStoreFile = "./database/repo-datastore.json";

  fs.readFile("./database/repo-datastore.json", (err, data) => {
    if (err) {
      console.log("Datastore file read error : " + err);
      res.json({
        message: "REPO_ACCESS_ERROR"
      });
      throw err;
    } else {
      console.log("Data : " +JSON.stringify(data.toString()))
      if (data.toString() !== "" && typeof JSON.stringify(data.toString()) !== undefined && JSON.stringify(data.toString()) !== "") {
        const existingData = JSON.parse(data.toString());

        console.log("Existing Data : " + existingData);

        existingData.push(repoObject);

        fs.writeFile(dataStoreFile, JSON.stringify(existingData), err => {
          if (err) {
            console.log("Write Error : " +err);
            res.json({
              message: "REPO_WRITE_FAILED"
            });
          } else {
            res.json({
              message: "REPO_DATA_STORED",
              repoId: id
            });
          }
        });
      } else {
        const newRepoData = [repoObject]
        fs.writeFile(dataStoreFile, JSON.stringify(newRepoData), err => {
          if (err) {
            console.log(err);
            res.json({
              message: "REPO_WRITE_FAILED"
            });
          } else {
            res.json({
              message: "REPO_DATA_STORED",
              repoId: id
            });
          }
        });
      }
    }
  });
});

module.exports = app;
