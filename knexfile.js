const path = require("path");
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const dbPath = path.resolve(path.join(process.cwd(), "db", "db.sqlite3"));

module.exports = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: dbPath,
    },
  },
  production: {
    client: "better-sqlite3",
    connection: {
      filename: dbPath,
    },
  },
};
