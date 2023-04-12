import dotenv from 'dotenv';
dotenv.config();

export const developmentDbConfig = {
  client: process.env.DB_CONNECTION,
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
  }
};

export const dockerDbConfig = {
  client: process.env.DB_CONNECTION,
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
  }
};

const { NODE_ENV } = process.env;

let dbConfig;

switch (NODE_ENV) {
  case 'development':
    dbConfig = developmentDbConfig;
    break;
  case 'test':
    dbConfig = dockerDbConfig;
    break;
  default:
    throw new Error(`Unknown environment: ${NODE_ENV}`);
}

export default dbConfig;
