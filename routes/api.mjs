import express from "express";

// Controllers
import Collection from '../controllers/Collection.mjs';
import Flashcard from '../controllers/Flashcard.mjs';
import Note from "../controllers/Note.mjs";


// Middleware
import ErrorHandler from '../middlewares/ErrorHandler.mjs';

const router = express.Router();


// Notes Routes
router.get("/notes", Note.getAllNotes);
router.get("/notes/:id", Note.getNoteById);
router.post("/notes", Note.createNote);
router.put("/notes/:id", Note.updateNote);
router.delete("/notes/:id", Note.deleteNote);

// Collection Routes
router.get('/collections', Collection.getAllCollections);
router.get('/collections/:id', Collection.getCollectionById);
router.post('/collections', Collection.createCollection);
router.put('/collections/:id', Collection.updateCollection);
router.delete('/collections/:id', Collection.deleteCollection);

// Flashcards routes
router.put('/flashcards/:id', Flashcard.updateFlashcard);
router.delete('/flashcards/:id', Flashcard.deleteFlashcard );

router.use(ErrorHandler);

export default router;

