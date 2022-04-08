const sequelize = require('../libs/sequelize');
const { QueryTypes } = require('sequelize');

class HistorialService {

    constructor() {}


    async find(idUsuario, desde, role){

        let historial;
        let query;

        if(role !== 'ADMIN_ROLE'){
            historial = await sequelize.query(`select component.nombre_cultivo, historial.nombre_sensor, historial.hora, historial.fecha, historial.peso_actual, historial.temperatura, historial.humedad from component, historial where user_id = ${idUsuario} AND (component.nombre_sensor = historial.nombre_sensor) order by historial.hora DESC limit 5 offset ${desde}`, { type: QueryTypes.SELECT });
            query  =  await sequelize.query(`select count(historial.nombre_sensor) as total from component, historial where user_id = ${idUsuario} AND component.nombre_sensor = historial.nombre_sensor`, { type: QueryTypes.SELECT });
        }
        else{
            historial = await sequelize.query(`select component.nombre_cultivo, historial.nombre_sensor, historial.hora, historial.fecha, historial.peso_actual, historial.temperatura, historial.humedad from component, historial where (component.nombre_sensor = historial.nombre_sensor) order by historial.hora DESC limit 5 offset ${desde}`, { type: QueryTypes.SELECT });
            query  =  await sequelize.query(`select count(historial.nombre_sensor) as total from component, historial where component.nombre_sensor = historial.nombre_sensor`, { type: QueryTypes.SELECT });

        }

        let total = 0;
        for (const item of query){
            total = (item.total);
        }

        return {
            historial,
            total
        };
    }

    async findAll(idUsuario, role) {

        let allHistorial;
        if(role !== 'ADMIN_ROLE'){
            allHistorial = await sequelize.query(`select historial.nombre_sensor, component.nombre_cultivo, historial.peso_actual, historial.temperatura, historial.humedad, historial.fecha, historial.hora from component, historial where user_id = ${idUsuario} AND (component.nombre_sensor = historial.nombre_sensor) order by historial.hora DESC, historial.fecha`, { type: QueryTypes.SELECT });
        }
        else{
            allHistorial = await sequelize.query(`select historial.nombre_sensor, component.nombre_cultivo, historial.peso_actual, historial.temperatura, historial.humedad, historial.fecha, historial.hora from component, historial where (component.nombre_sensor = historial.nombre_sensor) order by historial.hora DESC, historial.fecha`, { type: QueryTypes.SELECT });
        }

        return allHistorial;
    }

}

module.exports = HistorialService;
