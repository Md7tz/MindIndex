import express from 'express';

// Controllers
import Collection from '../controllers/Collection.mjs';

// Middleware
import ErrorHandler from '../middlewares/ErrorHandler.mjs';

const router = express.Router();

router.get('/collections', Collection.getAllCollections);
router.get('/collections/:id', Collection.getCollectionById);
router.post('/collections', Collection.createCollection);
router.put('/collections/:id', Collection.updateCollection);
router.delete('/collections/:id', Collection.deleteCollection);

router.use(ErrorHandler);

export default router;