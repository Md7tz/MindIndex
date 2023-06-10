const dotenv = require('dotenv');
dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: process.env.DB_CONNECTION || 'pg',
    useNullAsDefault: true,
    connection: {
      host: process.env.DB_HOST || 'host.docker.internal',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 5432,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: { directory: './seeds' },
  },

  docker: {
    client: process.env.DB_CONNECTION || 'pg',
    useNullAsDefault: true,
    connection: {
      host: process.env.DB_HOST || 'db',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'toor',
      database: process.env.DB_NAME || 'database',
      port: process.env.DB_PORT || 5432,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: { directory: './seeds' },
  },
};
