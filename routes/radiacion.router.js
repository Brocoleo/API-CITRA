const express = require('express');
const RadiacionService = require('./../services/radiacion.service');
const router = express.Router();
const service = new RadiacionService();



router.get('/unMes/:mesX',
    async (req, res, next) => {
    try {

        const { mesX} = req.params;
        const  mes = await service.unMes(mesX);
        res.json(mes);
    } catch (error) {
        next(error);
    }
});



router.get('/rangoRadiacion/:mes/:hora_inicio/:hora_final',
    async (req, res, next) => {
        try {
            const { mes, hora_inicio, hora_final } = req.params

            const sensores = await service.rangoMesHoras(mes, hora_inicio, hora_final);
            res.json(sensores);
        } catch (error) {
            next(error);
        }
    }
);



module.exports = router;
