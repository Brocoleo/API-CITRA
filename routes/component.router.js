const express = require('express');
const passport = require('passport');

const ComponentService = require('./../services/component.service');
const AuthService = require('../services/auth.service');

const validatorHandler = require('./../middlewares/validator.handler');
const {createComponentSchema, updateComponentSchema, getComponentSchema } = require('./../schemas/component.schema');

const router = express.Router();
const service = new ComponentService();
const auth = new AuthService();

// Obtiene los sensores para la tabla.
router.get('/paginacion',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
    try {
        const desde = Number(req.query.desde) || 0;
        const { componentes, total }  = await service.find( desde );
        res.json({
            componentes,
            total
        });
    } catch (error) {
        next(error);
    }
});

router.get('/sensor/:nombreSensor',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
    try {

        const { nombreSensor} = req.params;
        const  [componente]= await service.unSensor(nombreSensor);

        res.json(componente);
    } catch (error) {
        next(error);
    }
});

// buscar las naves por adminsitrador y usuario
router.get('/nave',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
    try {
        const token  = req.headers.authorization.split(" ")[1];
        const user = await auth.getUser(token);
        const naves = await service.getNaves(user.id, user.role)
        res.json(naves);
    } catch (error) {
        next(error);
    }
});

router.get('/sensores/:nombreNave',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(getComponentSchema, 'params'),
    async (req, res, next) => {
        try {
            const token  = req.headers.authorization.split(" ")[1];
            const user = await auth.getUser(token);
            const { nombreNave } = req.params;
            const sensores = await service.allGraficas(user.id, nombreNave.toLowerCase(), user.role);
            res.json(sensores);
        } catch (error) {
            next(error);
        }
    }
);


router.get('/notificaciones',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
        try {

            const token  = req.headers.authorization.split(" ")[1];
            const user = await auth.getUser(token);
            const notificaciones = await service.getNotificaciones(user.id, user.role);
            res.json(notificaciones);
        } catch (error) {
            next(error);
        }
    }
);

// Crear un nuevo sensor
router.post('/',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(createComponentSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newComponent = await service.create(body);
            res.status(201).json(newComponent);
        } catch (error) {
            next(error);
        }
    }
);

// Modificar sensor por nombre Sensor

router.patch('/:nombreSensor',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(getComponentSchema, 'params'),
    validatorHandler(updateComponentSchema, 'body'),
    async (req, res, next) => {
        try {
            const { nombreSensor } = req.params;
            const body = req.body;
            const [{ id }]  =  await service.findSensor(nombreSensor);
            const component = await service.update(id, body);
            res.json(component);
        } catch (error) {
            next(error);
        }
    }
);

// Eliminar Sensor por NOMBRE SENSOR

router.delete('/:nombreSensor',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(getComponentSchema, 'params'),
    async (req, res, next) => {
        try {
            const { nombreSensor } = req.params;
            await service.delete(nombreSensor);
            res.status(201).json({nombreSensor});
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
