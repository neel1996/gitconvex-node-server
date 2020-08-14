const { getEnvData } = require("./getEnvData");
const { fetchRepoHandler } = require("../API/fetchRepoApi");
const { gitCommitLogHandler } = require("../git/gitCommitLogsAPI");
const sqlite = require("sqlite3").verbose();

async function gitCommitLogToDb() {
  const db = new sqlite.Database(getEnvData().COMMITLOG_DB, (err) => {
    if (err) {
      console.log(err);
    }
  });

  console.log("INFO: SQLite DB module for commit logs");

  db.serialize(async () => {
    const repoList = await fetchRepoHandler();

    repoList &&
      repoList.repoId.forEach(async (repoId) => {
        db.run(
          `CREATE TABLE IF NOT EXISTS commitLog_${repoId} (hash TEXT NOT NULL PRIMARY KEY, author TEXT, commit_date TEXT, commit_message TEXT, commit_relative_time TEXT)`
        );

        await gitCommitLogHandler(repoId, 0)
          .then(async (res) => {
            const { commits } = res;
            let totalCommits = res.totalCommits / 10;
            let skipLimit = 10;
            let commitLogs = [];

            for (let i = 0; i < totalCommits; i++) {
              await gitCommitLogHandler(repoId, skipLimit)
                .then((res) => {
                  commitLogs.push(res.commits);
                })
                .catch((err) => {
                  console.log(err);
                });
              skipLimit = skipLimit + 10;
            }

            let commitArray = commitLogs && Promise.all(commitLogs);

            let commitList = [];

            await commitArray.then(async (res) => {
              res.forEach((item) => {
                const prom = Promise.all(item);
                prom.then((r) => {
                  commitList.push(r);
                });
              });
            });

            commitList &&
              commitList.forEach(async (commitData) => {
                commitData.forEach(async (item) => {
                  const {
                    hash,
                    author,
                    commitTime,
                    commitMessage,
                    commitRelativeTime,
                  } = item;

                  if (hash) {
                    db.all(
                      `SELECT hash from commitLog_${repoId} WHERE hash="${hash}"`,
                      [],
                      (err, rows) => {
                        if (err) {
                          console.log(err);
                        }
                        if (!rows.length) {
                          console.log("INFO: Inserting new commit logs", item);
                          db.run(
                            `INSERT INTO commitLog_${repoId}(hash,author,commit_date,commit_message,commit_relative_time) VALUES("${hash}", "${author}", "${commitTime}", "${commitMessage}.replace('"','\\"')", "${commitRelativeTime}")`,
                            (err) => {
                              if (err) {
                                console.log(err);
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                });
              });
          })
          .catch((err) => {
            console.log(err);
          });
      });
  });
}

module.exports.gitCommitLogToDb = gitCommitLogToDb;
