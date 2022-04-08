const express = require('express');

const usersRouter = require('./users.router');
const componentsRouter = require('./component.router');
const historialRouter = require('./historial.router');
const authRouter = require('./auth.router');

function routerApi(app){

    const router = express.Router();
    app.use('/api', router);
    router.use('/users', usersRouter);
    router.use('/component', componentsRouter);
    router.use('/historial', historialRouter);
    router.use('/auth', authRouter);

}

module.exports = routerApi;
