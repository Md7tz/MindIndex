import express from "express";

// Controllers
import Profile from "../controllers/Profile.mjs";
import Collection from "../controllers/Collection.mjs";
import Flashcard from "../controllers/Flashcard.mjs";
import Note from "../controllers/Note.mjs";
import Auth from "../controllers/Auth.mjs";
import Search from "../controllers/Search.mjs";
import Payment from "../controllers/Payment.mjs";
import User from "../controllers/User.mjs";

// Middleware
import ErrorHandler from "../middlewares/ErrorHandler.mjs";
import Passport from "../middlewares/Passport.mjs";
import Restrict from "../middlewares/Restrict.mjs";

const router = express.Router();

// Payment routes
router.post("/stripe/subscribe", Passport.bearerAuthenticate(), Payment.subscribeStripe);
router.post("/stripe/webhook", express.raw({ type: "application/json" }), Payment.callbackStripe);

// Auth routes
router.post("/auth/login", Auth.login);
router.post("/auth/register", Auth.register);
router.post("/auth/refresh", Passport.bearerAuthenticate(), Auth.refreshToken);

// User Routes
router.get("/users/:id", Passport.bearerAuthenticate(), User.getUserById);
router.get("/users/:id/profile", Passport.bearerAuthenticate(), Profile.getProfileByUserId);
router.put("/users/:id/profile", Passport.bearerAuthenticate(), Profile.updateProfile);
router.get("/users/:id/notes", Passport.bearerAuthenticate(), Note.getNotesByUserId);
router.get("/users/:id/collections", Passport.bearerAuthenticate(), Collection.getCollectionsByUserId);
router.get("/users/:id/subscription", Passport.bearerAuthenticate(), Payment.getSubscriptionByUserId);

// Notes Routes
router.get("/notes", Passport.bearerAuthenticate(), Note.getNotes);
router.get("/notes/:id", Passport.bearerAuthenticate(), Note.getNoteById);
router.post("/notes", Passport.bearerAuthenticate(), Note.createNote, Restrict);
router.put("/notes/:id", Passport.bearerAuthenticate(), Note.updateNote, Restrict);
router.delete("/notes/:id", Passport.bearerAuthenticate(), Note.deleteNote);

// Collection Routes
router.get("/collections", Passport.bearerAuthenticate(), Collection.getCollections);
router.get("/collections/:id", Passport.bearerAuthenticate(), Collection.getCollectionById);
router.post("/collections", Passport.bearerAuthenticate(), Collection.createCollection, Restrict);
router.put("/collections/:id", Passport.bearerAuthenticate(), Collection.updateCollection, Restrict);
router.delete("/collections/:id", Passport.bearerAuthenticate(), Collection.deleteCollection);

// Flashcards routes
router.put("/flashcards/:id", Passport.bearerAuthenticate(), Flashcard.updateFlashcard);
router.delete("/flashcards/:id", Passport.bearerAuthenticate(), Flashcard.deleteFlashcard);

// Search routes
router.get("/search", Passport.bearerAuthenticate(), Search.search);

router.use(ErrorHandler);

export default router;
