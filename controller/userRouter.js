const express = require('express');
const { userService } = require('../service/userService');
const router = express.Router();

router.get('/users', async (req, res) => {
    res.send(await userService.getAll());
})

router.get('/users/sorted', async (req, res) => {
    res.send(await userService.getAll(sort=true));
})

router.get('/users/age/:age', async (req, res) => {
    let {age} = req.params;
    res.send(await userService.getByAge(parseInt(age)));
})

router.get('/users/domain/:domain', async (req, res) => {
    const {domain} = req.params;
    res.send(await userService.getByDomain(domain));
})

router.get('/users/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        res.send(await userService.getById(id));
    } catch(e) {
        next(e);
    }
})

router.post('/users', async (req, res, next) => {
    const user = req.body;
    try {
        res.status(201).send(await userService.add(user));
    } catch (e) {
        next(e);
    }
})

router.put('/users/:id', async (req, res, next) => {
    const user = req.body;
    const {id} = req.params;
    try {
        res.send(await userService.update(user, id));
    } catch(e) {
        next(e);
    }
})

router.delete('/users/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        res.status(204).send(await userService.delete(id));
    } catch(e) {
        next(e);
    };
})

module.exports.userRouter = router;