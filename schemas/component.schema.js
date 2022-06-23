const Joi = require('joi');

const id = Joi.number()
const nombreCultivo = Joi.string().min(3).max(15);
const nombreSensor = Joi.string();
const valorMaximoTemp = Joi.number().integer();
const valorMinimoTemp = Joi.number().integer();
const valorMaximoHumedad = Joi.number().integer();
const valorMinimoHumedad = Joi.number().integer();
const userId = Joi.number();


const createComponentSchema = Joi.object({

    nombreCultivo : nombreCultivo.required(),
    nombreSensor: nombreSensor.required(),
    valorMaximoTemp: valorMaximoTemp.required(),
    valorMinimoTemp: valorMinimoTemp.required(),
    valorMaximoHumedad: valorMaximoHumedad.required(),
    valorMinimoHumedad: valorMinimoHumedad.required(),
    userId: userId.required()
});

const updateComponentSchema = Joi.object({
    nombreCultivo,
    nombreSensor,
    valorMaximoTemp,
    valorMinimoTemp,
    valorMaximoHumedad,
    valorMinimoHumedad,
    userId
});

const getComponentSchema = Joi.object({
    id,
    nombreSensor: nombreSensor,
    nombreCultivo: nombreCultivo,
    valorMaximoTemp: valorMaximoTemp,
    valorMinimoTemp: valorMinimoTemp,
    valorMaximoHumedad: valorMaximoHumedad,
    valorMinimoHumedad: valorMinimoHumedad,
    userId: userId


});

module.exports = {
    createComponentSchema,
    updateComponentSchema,
    getComponentSchema
}
