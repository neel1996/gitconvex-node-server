const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database(":memory:");
const promisify = require("util").promisify;

const daoFunction = () => {
  var repoEntries = [];

  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS repo_datastore (repo_name TEXT, repo_path TEXT)"
    );

    db.each(
      "SELECT repo_name AS name, repo_path as path FROM repo_datastore",
      function(err, row) {
        repoEntries.push({
          repoName: row.name,
          repoPath: row.path
        });
      }
    );
  });
  return repoEntries;
};

module.exports = promisify(daoFunction);
