// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './db/db.sqlite3',
    },
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './db/db.sqlite3',
    },
  },
};
