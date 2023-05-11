import express from 'express';
import Controller from '../controllers/index.mjs';
import FlashcardController from '../controllers/FlashcardController.mjs';

const router = express.Router();


router.get('/test', Controller.testGet);

router.post('/test', (req, res, next) => {
    res.json({ msg: 'Post request to /api/test' });
});

router.put('/test', (req, res, next) => {
    res.json({ msg: 'Put request to /api/test' });
});

router.delete('/test', (req, res, next) => {
    res.json({ msg: 'Delete request to /api/test' });
});

router.patch('/test', (req, res, next) => {
    res.json({ msg: 'Patch request to /api/test' });
});

router.get('/flashcards', FlashcardController.getAll);
router.get('/flashcards/:id', FlashcardController.getById);
router.post('/flashcards', FlashcardController.create);
router.put('/flashcards/:id', FlashcardController.update);
router.delete('/flashcards/:id', FlashcardController.delete );



export default router;