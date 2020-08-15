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

  console.log("INFO: Initiaitng SQLite DB module for commit logs");

  db.serialize(async () => {
    const repoList = await fetchRepoHandler();

    repoList &&
      repoList.repoId.forEach(async (repoId) => {
        db.run(
          `CREATE TABLE IF NOT EXISTS commitLog_${repoId} (hash TEXT NOT NULL PRIMARY KEY, author TEXT, commit_date TEXT, commit_message TEXT, commit_relative_time TEXT)`
        );

        await gitCommitLogHandler(repoId, 0)
          .then(async (res) => {
            let totalCommits = res.totalCommits / 10 + 1;
            let skipLimit = 10;

            if (totalCommits > 500) {
              console.log(
                "WARN: The commit log volume is huge, so the log crawling process will take a while to complete!"
              );
            }

            for (let i = 0; i <= totalCommits; i++) {
              skipLimit = i * 10;

              await gitCommitLogHandler(repoId, skipLimit)
                .then((res) => {
                  inserToDbHandler(Promise.all(res.commits), db, repoId);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
  });
}

async function inserToDbHandler(commitArray, db, repoId) {
  // let commitArray = commitLogs && Promise.all(commitLogs);

  let commitList = [];

  await commitArray
    .then(async (res) => {
      res.forEach((item) => {
        commitList.push(item);
      });
    })
    .catch((err) => {
      console.log(err);
    });

  commitList = commitList.filter((item) => (item ? true : false));

  commitList &&
    commitList.forEach(async (commitData) => {
      let {
        hash,
        author,
        commitTime,
        commitMessage,
        commitRelativeTime,
      } = commitData;

      commitMessage = commitMessage.split('"').join('""');

      if (hash) {
        db.all(
          `SELECT hash from commitLog_${repoId} WHERE hash="${hash}" ORDER BY commit_date`,
          [],
          (err, rows) => {
            if (err) {
              console.log(err);
            }
            if (rows && rows.length === 0) {
              db.run(
                `INSERT INTO commitLog_${repoId}(hash,author,commit_date,commit_message,commit_relative_time) VALUES("${hash}", "${author}", "${commitTime}", "${commitMessage}", "${commitRelativeTime}")`,
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
}

gitCommitLogToDb();

module.exports.gitCommitLogToDb = gitCommitLogToDb;
