const Joi = require('joi');

const id = Joi.number()
const nombreCultivo = Joi.string().min(3).max(15);
const nombreSensor = Joi.string();
const valorMaximo = Joi.number().integer();
const valorMinimo = Joi.number().integer();
const nombreNave = Joi.string().min(3);
const userId = Joi.string()


const createComponentSchema = Joi.object({

    nombreCultivo : nombreCultivo.required(),
    nombreSensor: nombreSensor.required(),
    valorMaximo: valorMaximo.required(),
    valorMinimo: valorMinimo.required(),
    nombreNave: nombreNave.required(),
    userId: userId.required()
});

const updateComponentSchema = Joi.object({
    nombreCultivo,
    valorMaximo,
    valorMinimo,
    nombreNave
});

const getComponentSchema = Joi.object({
    id,
    nombreSensor: nombreSensor,
    nombreCultivo: nombreCultivo,
    nombreNave: nombreNave

});

module.exports = {
    createComponentSchema,
    updateComponentSchema,
    getComponentSchema
}
