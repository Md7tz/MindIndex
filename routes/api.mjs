import express from "express";
import openid from "express-openid-connect";

// Controllers
import User from "../controllers/User.mjs";
import Profile from "../controllers/Profile.mjs";
import Collection from "../controllers/Collection.mjs";
import Flashcard from "../controllers/Flashcard.mjs";
import Note from "../controllers/Note.mjs";
import Auth from "../controllers/Auth.mjs";

// Middleware
import ErrorHandler from "../middlewares/ErrorHandler.mjs";

// Config
import config from "../config/auth0.mjs";

const router = express.Router();
const { requiresAuth: authenicate, auth } = openid;

// Auth0 Routes
// are: /login, /logout, /callback, /refresh, /userinfo, 
router.use(auth(config));

// Auth: override default auth0 routes
router.get("/register", Auth.register);
router.get("/login", Auth.login);
router.get("/logout", authenicate(), Auth.logout);
router.get("/refresh", authenicate(), Auth.refresh); // refresh token
router.get("/token", authenicate(), Auth.token); // access token
router.get("/userinfo", authenicate(), Auth.userinfo); // user info
router.get("/callback", authenicate(), Auth.callback); // callback url after login
router.get("/profile", authenicate(), Auth.profile); // initial profile page

// User Routes
router.get("/users", User.getAllUsers);
router.get("/users/:id", User.getUserById);
router.post("/users", User.createUser);
router.put("/users/:id", User.updateUser);
router.delete("/users/:id", User.deleteUser);

// Profile Routes
router.get("users/:id/profiles", authenicate(), Profile.getProfileByUserId);
// router.post("users/:id/profiles", authenicate(),Profile.createProfile);
router.put("users/:id/profiles", authenicate(), Profile.updateProfile);

// Notes Routes
router.get("/notes", authenicate(), Note.getAllNotes);
router.get("/notes/:id", authenicate(), Note.getNoteById);
router.post("/notes", authenicate(), Note.createNote);
router.put("/notes/:id", authenicate(), Note.updateNote);
router.delete("/notes/:id", authenicate(), Note.deleteNote);

// Collection Routes
router.get("/collections", authenicate(), Collection.getAllCollections);
router.get("/collections/:id", authenicate(), Collection.getCollectionById);
router.post("/collections", authenicate(), Collection.createCollection);
router.put("/collections/:id", authenicate(), Collection.updateCollection);
router.delete("/collections/:id", authenicate(), Collection.deleteCollection);

// Flashcards routes
router.put("/flashcards/:id", authenicate(), Flashcard.updateFlashcard);
router.delete("/flashcards/:id", authenicate(), Flashcard.deleteFlashcard);

router.use(ErrorHandler);

export default router;
