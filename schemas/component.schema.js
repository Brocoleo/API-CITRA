const Joi = require('joi');

const id = Joi.number()
const nombreCultivo = Joi.string().min(3).max(15);
const nombreSensor = Joi.string();
const valorMaximoTemp = Joi.number().integer();
const valorMinimoTemp = Joi.number().integer();
const valorMaximoHumedad = Joi.number().integer();
const valorMinimoHumedad = Joi.number().integer();
const nombreNave = Joi.string().min(3);
const user_id = Joi.number();


const createComponentSchema = Joi.object({

    nombreCultivo : nombreCultivo.required(),
    nombreSensor: nombreSensor.required(),
    valorMaximoTemp: valorMaximoTemp.required(),
    valorMinimoTemp: valorMinimoTemp.required(),
    valorMaximoHumedad: valorMaximoHumedad.required(),
    valorMinimoHumedad: valorMinimoHumedad.required(),
    nombreNave: nombreNave.required(),
    user_id: user_id.required()
});

const updateComponentSchema = Joi.object({
    nombreCultivo,
    nombreSensor,
    valorMaximoTemp,
    valorMinimoTemp,
    valorMaximoHumedad,
    valorMinimoHumedad,
    user_id
});

const getComponentSchema = Joi.object({
    id,
    nombreSensor: nombreSensor,
    nombreCultivo: nombreCultivo,
    valorMaximoTemp: valorMaximoTemp,
    valorMinimoTemp: valorMinimoTemp,
    valorMaximoHumedad: valorMaximoHumedad,
    valorMinimoHumedad: valorMinimoHumedad,
    user_id: user_id


});

module.exports = {
    createComponentSchema,
    updateComponentSchema,
    getComponentSchema
}
