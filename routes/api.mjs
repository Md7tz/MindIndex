import express from 'express';

// Controllers
import Collection from '../controllers/Collection.mjs';
import Flashcard from '../controllers/Flashcard.mjs';

// Middleware
import ErrorHandler from '../middlewares/ErrorHandler.mjs';

const router = express.Router();

// Collection routes
router.get('/collections', Collection.getAllCollections);
router.get('/collections/:id', Collection.getCollectionById);
router.post('/collections', Collection.createCollection);
router.put('/collections/:id', Collection.updateCollection);
router.delete('/collections/:id', Collection.deleteCollection);

// Flashcards routes
router.put('/flashcards/:id', FlashcardController.update);
router.delete('/flashcards/:id', FlashcardController.delete );

router.use(ErrorHandler);

export default router;