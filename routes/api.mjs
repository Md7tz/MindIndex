import express from 'express';

// Controllers
import Controller from '../controllers/index.mjs';
import Collection from '../controllers/Collection.mjs';

// Middleware
import ErrorHandler from '../middlewares/ErrorHandler.mjs';

const router = express.Router();

router.use(ErrorHandler);

export default router;