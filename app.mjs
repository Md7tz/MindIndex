import express from 'express';
import next from 'next';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import knex from 'knex';
import morgan from 'morgan';
// import { Model } from 'objection';
import dbConfig from './config/knexfile.mjs';

import api from './routes/api.mjs';


const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const upload = multer();
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

export default server;
