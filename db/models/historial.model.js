const { Model, DataTypes } = require('sequelize');

const HISTORIAL_TABLE = 'historial';

const HistorialSchema = {

    nombreSensor: {
        type: DataTypes.STRING,
        field: 'nombre_sensor'
    },
    pesoActual: {
        allowNull: false,
        type: DataTypes.DOUBLE,
        field: 'peso_actual'
    },
    temperatura: {
        allowNull: false,
        type: DataTypes.DOUBLE
    },
    humedad: {
        allowNull: false,
        type: DataTypes.DOUBLE
    },
    hora: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.TIME
    },
    fecha: {
        allowNull: false,
        type: DataTypes.DATEONLY
    }
}

class Historial extends Model {
    static associate() {
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: HISTORIAL_TABLE,
            modelName: 'Historial',
            timestamps: false
        }
    }
}

module.exports = {
    HISTORIAL_TABLE,
    HistorialSchema,
    Historial
}
