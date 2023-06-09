import express from "express";

// Controllers
import User from "../controllers/User.mjs";
import Profile from "../controllers/Profile.mjs";
import Collection from "../controllers/Collection.mjs";
import Flashcard from "../controllers/Flashcard.mjs";
import Note from "../controllers/Note.mjs";
import Auth from "../controllers/Auth.mjs";

// Middleware
import ErrorHandler from "../middlewares/ErrorHandler.mjs";
import Passport from "../middlewares/Passport.mjs";

const router = express.Router();

// Auth routes
router.post("/auth/login", Auth.login);
router.post("/auth/register", Auth.register);
router.post("/auth/refresh", Passport.bearerAuthenticate(), Auth.refreshToken);
// User Routes
// router.get("/users", User.getAllUsers);
// router.get("/users/:id", User.getUserById);
// router.post("/users", User.createUser);
// router.put("/users/:id", User.updateUser);
// router.delete("/users/:id", User.deleteUser);

// Profile Routes
router.get("/user/:id/profile", Passport.bearerAuthenticate(), Profile.getProfileByUserId);
router.put("/user/:id/profile", Passport.bearerAuthenticate(), Profile.updateProfile);

// Notes Routes
router.get("/notes", Passport.bearerAuthenticate(), Note.getAllNotes);
router.get("/user/:id/notes/:pageSize/:pageNumber", Passport.bearerAuthenticate(), Note.getNotesByUserId);
router.get("/notes/:id", Passport.bearerAuthenticate(), Note.getNoteById);
router.post("/notes", Passport.bearerAuthenticate(), Note.createNote);
router.put("/notes/:id", Passport.bearerAuthenticate(), Note.updateNote);
router.delete("/notes/:id", Passport.bearerAuthenticate(), Note.deleteNote);

// Collection Routes
router.get("/collections", Passport.bearerAuthenticate(), Collection.getAllCollections);
router.get("/user/:id/collections/:pageSize/:pageNumber", Passport.bearerAuthenticate(), Collection.getCollectionsByUserId);
router.get("/collections/:id", Passport.bearerAuthenticate(), Collection.getCollectionById);
router.post("/collections", Passport.bearerAuthenticate(), Collection.createCollection);
router.put("/collections/:id", Passport.bearerAuthenticate(), Collection.updateCollection);
router.delete("/collections/:id", Passport.bearerAuthenticate(), Collection.deleteCollection);

// Flashcards routes
router.put("/flashcards/:id", Passport.bearerAuthenticate(), Flashcard.updateFlashcard);
router.delete("/flashcards/:id", Passport.bearerAuthenticate(), Flashcard.deleteFlashcard);

router.use(ErrorHandler);

export default router;
