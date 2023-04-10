import express from 'express';

// Path: routes\api\index.mjs
const router = express.Router();

router.get('/test', (req, res, next) => {
    res.json({ msg: 'Get request to /api/test' });
});

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


export default router;