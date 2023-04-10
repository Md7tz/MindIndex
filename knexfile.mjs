import dotenv from 'dotenv';
dotenv.config();

const developmentDbConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
  },
};

const dockerDbConfig = {
  client: 'pg',
  connection: {
    host: 'host.docker.internal',
    user: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || 'toor',
    database: process.env.POSTGRES_DB || 'database',
    port: process.env.POSTGRES_PORT || 5432,
  },
};

// const productionDbConfig = {
//   client: 'pg',
//   connection: {
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT || 5432,
//     user: process.env.DB_USER || 'myuser',
//     password: process.env.DB_PASSWORD || 'mypassword',
//     database: process.env.DB_NAME || 'mydatabase',
//     ssl: { rejectUnauthorized: false },
//   },
// };

const { NODE_ENV } = process.env;

let dbConfig;

switch (NODE_ENV) {
  case 'development':
    dbConfig = developmentDbConfig;
    break;
  case 'docker':
    dbConfig = dockerDbConfig;
    break;
  //   case 'production':
  //     dbConfig = productionDbConfig;
  //     break;
  default:
    throw new Error(`Unknown environment: ${NODE_ENV}`);
}

export default dbConfig;
