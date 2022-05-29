const Joi = require('joi');

const mes = Joi.number()
const horaInicio = Joi.string();
const horaFinal = Joi.string();
const radiacion = Joi.number();


const createRadiacionSchema = Joi.object({
    mes : mes.required(),
    horaInicio: horaInicio.required(),
    horaFinal: horaFinal.required(),
    radiacion: radiacion.required(),
});


const getRadiacionSchema = Joi.object({
    mes: mes,
    horaInicio: horaInicio,
    horaFinal: horaFinal,
    radiacion: radiacion

});

module.exports = {
    createRadiacionSchema,
    getRadiacionSchema
}
