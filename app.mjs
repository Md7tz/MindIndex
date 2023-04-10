import express from 'express';
import next from 'next';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import knex from 'knex';
import morgan from 'morgan';
// import { Model } from 'objection';
import dbConfig from './knexfile.mjs';

// routers
import api from './routes/api.mjs';

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
// server.use(helmet());
server.use(compression());
server.use(upload.any());
server.use(morgan('dev'));


// Serve static files from the 'public' directory
server.use(express.static('public'));

server.use(`/api`, api);

// Handle all other routes
server.all('*', (req, res) => {
    return handle(req, res);
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Bind the database instance to the Objection.js Model
// Model.knex(db);

export default server;
