const express = require('express');

const usersRouter = require('./users.router');
const componentsRouter = require('./component.router');
const historialRouter = require('./historial.router');
const authRouter = require('./auth.router');
const radiacionRouter = require('./radiacion.router');

function routerApi(app){

    const router = express.Router();
    app.use('/api', router);
    router.use('/users', usersRouter);
    router.use('/component', componentsRouter);
    router.use('/historial', historialRouter);
    router.use('/auth', authRouter);
    router.use('/radiacion', radiacionRouter);

}

module.exports = routerApi;
