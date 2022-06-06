const sequelize = require('../libs/sequelize');
const { QueryTypes } = require('sequelize');
const { models } = require('../libs/sequelize');

class RadiacionService {

    constructor() {}

    async create(data) {
        const componente = await models.Component.create(data);
        return componente;
    }

    async unMes(mesX){

        const mes = await sequelize.query(`select mes,hora_inicio,hora_final,radiacion from radiacion where radiacion.mes = '${mesX}'`, { type: QueryTypes.SELECT } );

        let total = 0;
        for (const item of mes){
            total = (item.total);
        }

        return {
            mes,
            total
        };
    }


    async rangoMesHoras(mes, hora_inicio, hora_final){
        const  rango = await sequelize.query(`select mes,hora_inicio,hora_final,radiacion from radiacion where radiacion.mes = ${mes} and (radiacion.hora_final >'${hora_final}' or radiacion.hora_final ='${hora_final}' ) and (radiacion.hora_inicio < '${hora_inicio}'or radiacion.hora_inicio = '${hora_inicio}')`, { type: QueryTypes.SELECT } );
        let total = 0;
        for (const item of rango){
            total = (item.total);
        }

        return {
            rango,
            total
        };

    }


  }



module.exports = RadiacionService ;
