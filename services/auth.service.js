const { config } = require('../config/config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client( config.googleId );

const UserService = require('../services/user.service');
const service = new UserService();

class AuthService {


    async googleVerify( tokenGoogle ) {

        const ticket = await client.verifyIdToken({
            idToken: tokenGoogle,
            audience: config.googleId,
        });

        const payload = ticket.getPayload();

        const { name, email, picture } = payload;

        let user;

        const userDB = await service.findByEmail(email);

        if(!userDB) {

            user = await service.create({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }
        else {
            user = await service.update(userDB.id, {
                ... userDB,
                password: '@@@',
                google: true
            });
        }

        const  { token }  = this.signToken(user);

        const role = user.role;

        return {
            token,
            role
        }
    }

    signToken(user){

        const payload = {
            sub: user.id,
            role: user.role
        }
        const token = jwt.sign(payload, config.jwtSecret)

        return{
            token
        }
    }

    async sendRecovery(email){

        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }

        const payload = { sub: user.id };
        const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
        const recoveryToken = token.replace(/[.]/g,'*');
        const link = `https://masterplantsensores.biovisionagricola.cl/new-password/${recoveryToken}`;
        await service.update(user.id, { recoveryToken: token });

        const mail = {
            from: config.smtpEmail,
            to: `${user.email}`,
            subject: "Email para recuperar contraseña",
            html: `<b>Ingresa a este link => ${link}</b>`,
        }

        const rta = await this.sendMail(mail);
        return rta;
    }

    async sendMail(infoMail){

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: true,
            port: 465,
            auth: {
                user: config.userNameGmail,
                pass: config.passwordGmail
            }
        });
        await transporter.sendMail(infoMail);
        return { message: 'email enviado'};
    }

    async changePassword(token, password) {

        try{

            const recovery = token.token.replace(/[*]/g,'.');
            const payload = jwt.verify(recovery, config.jwtSecret);
            const user = await service.findOne(payload.sub);
            if(user.recoveryToken !== recovery){
                throw boom.unauthorized();
            }
            const hash = await bcrypt.hash(password, 10);
            await service.update(user.id, {recoveryToken: null, password: hash});
            return { message: 'password modificado'}

        }catch (error) {
            throw boom.unauthorized();
        }

    }


    async getUser(token){

        const user = jwt.verify(token, config.jwtSecret);
        const userLoged = await service.findOne(user.sub);
        delete userLoged.dataValues.password;
        return userLoged;

    }
}


module.exports = AuthService;
