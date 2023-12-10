import knex from 'knex';
import kconfig from '../knexfile.js';

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

export const db = createConnection();
