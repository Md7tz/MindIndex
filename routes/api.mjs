import express from "express";

// Controllers
import Collection from '../controllers/Collection.mjs';
import NotesController from "../controllers/NotesController.mjs";

// Middleware
import ErrorHandler from '../middlewares/ErrorHandler.mjs';

const router = express.Router();


// Notes Routes
router.get("/notes", NotesController.getAll);
router.get("/notes/:id", NotesController.getById);
router.post("/notes", NotesController.create);
router.put("/notes/:id", NotesController.update);
router.delete("/notes/:id", NotesController.delete);

// Collection Routes
router.get('/collections', Collection.getAllCollections);
router.get('/collections/:id', Collection.getCollectionById);
router.post('/collections', Collection.createCollection);
router.put('/collections/:id', Collection.updateCollection);
router.delete('/collections/:id', Collection.deleteCollection);

router.use(ErrorHandler);

export default router;

