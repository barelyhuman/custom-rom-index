const knex = require('knex');
const kconfig = require('../knexfile');

/**
 * @type { import("knex").Knex }
 */
let connection;

const createConnection = () => {
  if (connection) return connection;

  connection = knex({
    ...kconfig[process.env.NODE_ENV || 'development'],
    useNullAsDefault: true,
  });

  return connection;
};

const db = createConnection();

exports.db = db;
