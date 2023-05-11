import express from "express";
import Controller from "../controllers/index.mjs";
import NotesController from "../controllers/NotesController.mjs";

const router = express.Router();

// Test Routes
router.get("/test", Controller.testGet);
router.post("/test", Controller.testPost);
router.put("/test", Controller.testPut);
router.delete("/test", Controller.testDelete);
router.patch("/test", Controller.testPatch);

// Notes Routes
router.get("/notes", NotesController.getAll);
router.get("/notes/:id", NotesController.getById);
router.post("/notes", NotesController.create);
router.put("/notes/:id", NotesController.update);
router.delete("/notes/:id", NotesController.delete);

export default router;
