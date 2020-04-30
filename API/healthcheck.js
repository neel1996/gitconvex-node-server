const express = require("express");
const graphqlHttp = require("express-graphql");
const app = express();
const cors = require("cors");
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);

const graphqlSchema = require("../global/graphqlSchemaHealthcheck");

app.use(cors());

app.use(
  "/healthcheck",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: {
      osCheck: async () => {
        return await checkStatus("OS").then(res => JSON.stringify(res));
      },
      gitCheck: async () => {
        return await checkStatus("GIT").then(res => JSON.stringify(res));
      },
      nodeCheck: async () => {
        return await checkStatus("NODE").then(res => JSON.stringify(res));
      },
      fetchRepo: async () => {
        return await daoModule();
      }
    },
    graphiql: true
  })
);

async function checkStatus(param) {
  var commandString = "";

  switch (param) {
    case "OS":
      commandString = `uname`;
      break;
    case "GIT":
      commandString = `git --version`;
      break;
    case "NODE":
      commandString = `node --version`;
      break;
    default:
      commandString = `echo 'NO_COMMAND'`;
  }

  return await execPromise(commandString).then(res => {
    if (res.stderr) {
      return {
        code: "ERR",
        status: `${param}_CHECK_FAILURE`,
        message: res.stderr
      };
    } else {
      return {
        code: "SUCCESS",
        status: `${param}_CHECK_PASSED`,
        message: res.stdout
      };
    }
  });
}

module.exports = app;
