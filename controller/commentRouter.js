const express = require('express');
const { commentService } = require('../service/commentService');
const router = express.Router();

router.get('/users/:userId/comments', async (req, res, next) => {
    const {userId} = req.params;
    try {
        res.send(await commentService.getAll(userId));
    } catch(e) {
        next(e);
    }
})

router.get('/users/:userId/comments/:commentId', async (req, res, next) => {
    const {userId, commentId} = req.params;
    try {
        res.send(await commentService.getById(userId, commentId));
    } catch(e) {
        next(e);
    }
})

router.post('/users/:userId/comments', async (req, res, next) => {
    const {userId} = req.params;
    const comment = req.body;
    try {
        res.send(await commentService.add(userId, comment));
    } catch(e) {
        next(e);
    } 
})

router.put('/users/:userId/comments/:commentId', async (req, res, next) => {
    const {userId, commentId} = req.params;
    const comment = req.body;
    try {
        res.send(await commentService.update(userId, commentId, comment));
    } catch(e) {
        next(e);
    }
})

router.delete('/users/:userId/comments/:commentId', async (req, res, next) => {
    const {userId, commentId} = req.params;
    try {
        res.send(await commentService.delete(userId, commentId));
    } catch(e) {
        next(e);
    }
})

module.exports.commentRouter = router;