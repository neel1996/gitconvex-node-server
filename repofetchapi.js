const express = require("express");
const graphHttp = require("express-graphql");
const app = express();
const cors = require("cors");
const util = require("util");
const fs = require("fs");

app.use(cors());

const fetchRepoGQLSchema = require("./graphqlSchemaFetchRepo");

app.use(
  "/fetchrepo",
  graphHttp({
    schema: fetchRepoGQLSchema,
    rootValue: {
      fetchRepo: async () => {
        var repoDSContent = fs.readFileSync('./database/repo-datastore.json');

        repoDSContent = repoDSContent.toString();

        if(repoDSContent !== ""){
          let responsePayload = {
            status: "REPO_PRESENT",
            content: repoDSContent.toString('utf8')
          }

          return JSON.stringify(responsePayload)
        }
        else{
          let responsePayload = {
            status: "REPO_ABSENT",
          }

          return JSON.stringify(responsePayload)
        }
      }
    },
    graphiql: true
  })
);


module.exports = app;
