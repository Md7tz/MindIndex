import express from "express";
import Controller from "../controllers/index.mjs";
import NotesController from "../controllers/NotesController.mjs";

const router = express.Router();

router.get("/test", Controller.testGet);

router.post("/test", (req, res, next) => {
  res.json({ msg: "Post request to /api/test" });
});

router.put("/test", (req, res, next) => {
  res.json({ msg: "Put request to /api/test" });
});

router.delete("/test", (req, res, next) => {
  res.json({ msg: "Delete request to /api/test" });
});

router.patch("/test", (req, res, next) => {
  res.json({ msg: "Patch request to /api/test" });
});

router.get("/notes", NotesController.getAll);
router.get("/notes/:id", NotesController.getById);
router.post("/notes", NotesController.create);
router.put("/notes/:id", NotesController.update);
router.delete("/notes/:id", NotesController.delete);
export default router;
