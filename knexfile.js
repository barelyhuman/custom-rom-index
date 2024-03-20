import path from 'path';
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const dbPath = path.resolve(path.join(process.cwd(), 'db', 'db.sqlite3'));

export default {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: dbPath,
    },
  },
  production: {
    client: 'better-sqlite3',
    connection: {
      filename: dbPath,
    },
  },
};
