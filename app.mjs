import express from 'express';
import next from 'next';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import knex from 'knex';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { Model } from 'objection';

import _dbConfig from './knexfile.js';
import swaggerDocs from './config/swagger.mjs';

import api from './routes/api.mjs';
import Passport from './middlewares/Passport.mjs';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const upload = multer();

let dbConfig = null;

switch (process.env.NODE_ENV) {
    case 'development':
        dbConfig = _dbConfig.development;
        break;
    case 'test':
        dbConfig = _dbConfig.docker;
        break;
    default:
        throw new Error(`Unknown environment: ${NODE_ENV}`);
}

const db = knex(dbConfig);
const server = express();

// Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(compression());
server.use(upload.any());
server.use(morgan('dev'));

// Serve static files from the 'public' directory
server.use(express.static('public'));

// Routers
server.use(`/api`, api);

// Serve Swagger UI at /docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Handle all other routes
server.all('*', (req, res) => {
    return handle(req, res);
});

// Start server
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Bind the database instance to the Objection.js Model
Model.knex(db);
// Initialize bearer authentication
Passport.initialize();

export default server;
