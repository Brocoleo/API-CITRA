const express = require('express');
const validatorHandler = require('./../middlewares/validator.handler');
const passport = require('passport');

const { createUserSchema, updateUserSchema, getUserSchema} = require('./../schemas/user.schema');

const router = express.Router();

const UserService = require('./../services/user.service');

const service = new UserService();


router.get('/',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
    try {
        const { usuarios } = await service.allUsers();
        res.json(usuarios);
    } catch (error) {
        next(error);
    }
});

router.get('/paginacion',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
    try {
        const desde = Number(req.query.desde) || 0;
        const { usuarios, total } = await service.find( desde );

        res.json({
            usuarios,
            total
        });
    } catch (error) {
        next(error);
    }
});


router.post('/',
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newUser = await service.create(body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const resp = await service.update(id, body);
            delete resp.dataValues.password; // esto se modifico aqui
            res.json(resp);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(201).json({id});
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
