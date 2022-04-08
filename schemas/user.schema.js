const Joi = require('joi');

const id = Joi.number()
const nombre = Joi.string()
const email = Joi.string().email();
const password = Joi.string().min(8);
const img = Joi.string();
const role = Joi.string().min(3);
const google = Joi.bool();

const createUserSchema = Joi.object({

    nombre: nombre.required(),
    email: email.required(),
    password: password.required(),
    img: img,
    role: role,
    google: google

});

const updateUserSchema = Joi.object({
    email: email,
    role: role,
    nombre:nombre
});

const getUserSchema = Joi.object({
    id: id
});


module.exports = {

    createUserSchema,
    updateUserSchema,
    getUserSchema,
}
