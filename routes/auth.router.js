const express = require('express');
const passport  = require('passport');
const { getMenuFrontend } = require('./../utils/menu-frontend');

const AuthService = require('../services/auth.service');

const service = new AuthService();


const router = express.Router();

router.post('/login',
    passport.authenticate('local', {session: false}),
    async (req, res, next) => {
        try {
            const user = req.user;
            const { token } = service.signToken(user);
            res.json({
                token,
                menu: getMenuFrontend(user.role)
            });
        } catch (error) {
        next(error);
    }
});

router.get('/profile',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
        try{
            const token  = req.headers.authorization.split(" ")[1];
            const  user =  await service.getUser(token);
            res.json(user);
        }catch(error){
            next(error);
        }
})

router.post('/google',
    async (req, res, next) => {
        try{
            const googleToken = req.body.token;
            const  { token, role } =  await service.googleVerify(googleToken);
            res.json({
                token,
                menu: getMenuFrontend (role)

            });
        }catch(error){
            next(error);
        }
})

router.post('/change-password',
    async (req, res, next) => {
        try {
            const { token, password } = req.body;
            const rta = await service.changePassword( token, password );
            res.json(rta);
        } catch (error) {
            next(error);
        }
    }
);


router.post('/recovery',
    async (req, res, next) => {
        try {
        const { email } = req.body;
        const rta = await service.sendRecovery( email );
        res.json(rta);
        } catch (error) {
        next(error);
        }
    }
);


module.exports = router;
