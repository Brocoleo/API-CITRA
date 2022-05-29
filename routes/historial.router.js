const express = require('express');
const passport = require('passport');

const router = express.Router();
const AuthService = require('../services/auth.service');

const HistorialService = require('./../services/historial.service');

const service = new HistorialService();
const auth = new AuthService();

router.get('/',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
    try {

        const token  = req.headers.authorization.split(" ")[1];
        const user = await auth.getUser(token);
        const desde = Number(req.query.desde) || 0;
        const historial = await service.find(user.id, desde, user.role);
        res.json(
            historial
        );
    } catch (error) {
        next(error);
    }
});

router.get('/all',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
    try {

        const token  = req.headers.authorization.split(" ")[1];
        const user = await auth.getUser(token);
        const historial = await service.findAll(user.id, user.role);

        res.json(
            historial
        );
    } catch (error) {
        next(error);
    }
});

router.get('/promedio/:nombreSensor/:fecha',
    async (req, res, next) => {
    try {
        const { nombreSensor, fecha } = req.params
        const promedio = await service.promedioTemperatura(nombreSensor, fecha);

        res.json(
          promedio
        );
    } catch (error) {
        next(error);
    }
});



module.exports = router;
