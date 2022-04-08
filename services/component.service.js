const boom = require('@hapi/boom');
const sequelize = require('../libs/sequelize');
const { QueryTypes } = require('sequelize');
const { models } = require('../libs/sequelize');

class ComponentService {

    constructor() {}

    async create(data) {
        const componente = await models.Component.create(data);
        return componente;
    }

    async unSensor(nombreSensor){

        const componente = await sequelize.query(`select nombre_cultivo, nombre_sensor, valor_maximo, valor_minimo, nombre_nave from component where component.nombre_sensor = '${nombreSensor}'`, { type: QueryTypes.SELECT } );
        return componente;
    }

    async find(desde) {
        const componentes = await sequelize.query(`select component.nombre_cultivo, component.nombre_sensor, component.valor_maximo, component.valor_minimo, component.nombre_nave, users.email as responsable from component, users where component.user_id = users.id limit 5 offset ${desde}`, { type: QueryTypes.SELECT } );
        const total = await models.Component.count();
        return {
            componentes,
            total
        };
    }

    async findOne(id) {
        const component = await models.Component.findByPk(id, {
            include:['user']
        });
        if (!component) {
            throw boom.notFound('user not found');
        }
        return component;
    }

    async update(id, changes) {
        const component = await models.Component.findByPk(id);
        const rta = component.update(changes);
        return rta;
    }


    async findSensor(nombreSensor) {
        const id= await sequelize.query(`SELECT id FROM component WHERE nombre_sensor = '${nombreSensor}' `, { type: QueryTypes.SELECT });
        return id;
    }

    async delete(nombreSensor) {

        const deleteComponent = await sequelize.query(`delete from component where nombre_sensor = '${nombreSensor}' `, { type: QueryTypes.DELETE });
        return {deleteComponent};
    }

    async getNaves(idUsuario, userRole) {

        let naves;
        if(userRole !== 'ADMIN_ROLE'){
            naves = await models.Component.findAll({
                attributes: ['nombreNave'],
                where: {
                    userId: idUsuario
                },
                group: 'nombreNave'
            })
        }
        else{
            naves = await models.Component.findAll({
                attributes: ['nombreNave'],
                group: 'nombreNave'
            })
        }
        return naves;
    }

    async allGraficas(idUsuario, nombreNave, role){

         // se debe arreglar esto de no tener dos awaits seguidos y el doble ciclo for

        let nombreSensores;
        let allSensores;
        if(role !== 'ADMIN_ROLE') {
            nombreSensores = await sequelize.query(`select nombre_sensor from component where user_id = ${idUsuario} and nombre_nave = '${nombreNave}'`, { type: QueryTypes.SELECT } );
            allSensores = await sequelize.query(`select component.nombre_cultivo, component.nombre_sensor, component.valor_maximo, component.valor_minimo, historial.peso_actual, historial.temperatura, historial.humedad from component, historial where (user_id = ${idUsuario}) AND (nombre_nave = '${nombreNave}') AND (component.nombre_sensor = historial.nombre_sensor) order by historial.hora DESC, historial.fecha`, { type: QueryTypes.SELECT });
        }
        else{
            nombreSensores = await sequelize.query(`select nombre_sensor from component where nombre_nave = '${nombreNave}'`, { type: QueryTypes.SELECT } );
            allSensores = await sequelize.query(`select component.nombre_cultivo, component.nombre_sensor, component.valor_maximo, component.valor_minimo, historial.peso_actual, historial.temperatura, historial.humedad from component, historial where (nombre_nave = '${nombreNave}') AND (component.nombre_sensor = historial.nombre_sensor) order by historial.hora DESC, historial.fecha`, { type: QueryTypes.SELECT });
        }
        const sensores = this.generarGraficas(allSensores);

        const graficasUsuario = [];

        for(const nombre of nombreSensores) {

            for(const sensor of sensores) {

                if(nombre.nombre_sensor === sensor.nombre_sensor ){

                    graficasUsuario.push({
                        ...sensor
                    })
                    break;
                }
            }
        }
        return graficasUsuario;
    }

    generarGraficas(arregloSensores){

        const graficas = [];

        arregloSensores.map(item => {

            const minimo_medio = Math.round(item.valor_maximo/3);
            const maximo_medio = 2 * minimo_medio;
            let intervalo = Math.trunc((item.valor_maximo * 10) / 100);

            if(item.valor_maximo <= 100) {
                intervalo = 10;
            }

            graficas.push({
                ...item,
                minimo_medio: minimo_medio,
                maximo_medio: maximo_medio,
                intervalo: intervalo,
            })
        })

        return graficas;
    }


    async getNotificaciones(idUsuario, role){

        // se debe arreglar esto de no tener dos awaits seguidos y el doble ciclo for

        let sensores;
        let alertasUsuarios;

        if(role !== 'ADMIN_ROLE'){
            sensores = await sequelize.query(`select nombre_sensor from component where user_id = ${idUsuario}`, { type: QueryTypes.SELECT } );
            alertasUsuarios = await sequelize.query(`select component.nombre_nave, component.nombre_sensor, historial.fecha, component.nombre_cultivo, component.nombre_sensor, component.valor_maximo, component.valor_minimo, historial.peso_actual, historial.temperatura, historial.humedad from component, historial where (user_id = ${idUsuario}) AND (component.nombre_sensor = historial.nombre_sensor) order by historial.hora DESC, historial.fecha`, { type: QueryTypes.SELECT });
        }
        else{
            sensores = await sequelize.query(`select nombre_sensor from component`, { type: QueryTypes.SELECT } );
            alertasUsuarios = await sequelize.query(`select component.nombre_nave, component.nombre_sensor, historial.fecha, component.nombre_cultivo, component.nombre_sensor, component.valor_maximo, component.valor_minimo, historial.peso_actual, historial.temperatura, historial.humedad from component, historial where (component.nombre_sensor = historial.nombre_sensor) order by historial.hora DESC, historial.fecha`, { type: QueryTypes.SELECT });
        }
        const notificaciones = this.generarGraficas(alertasUsuarios);

        const notificacionesUsuario = [];

        for (const itemSensor of sensores) {

            for(const itemNotificacion of notificaciones) {

                if(itemNotificacion.nombre_sensor === itemSensor.nombre_sensor) {

                    if(itemNotificacion.peso_actual < itemNotificacion.maximo_medio){
                        let alerta  = false;

                        (itemNotificacion.peso_actual > itemNotificacion.minimo_medio)
                            ? alerta = false
                            : alerta = true

                        notificacionesUsuario.push({
                            nombre_cultivo: itemNotificacion.nombre_cultivo,
                            nombre_sensor: itemNotificacion.nombre_sensor,
                            nombre_nave: itemNotificacion.nombre_nave,
                            valor_alerta: alerta
                        })
                    }
                    break;
                }
            }
        }
        return notificacionesUsuario;
    }
}

module.exports = ComponentService ;
