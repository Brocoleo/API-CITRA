const { Model, DataTypes } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const COMPONENT_TABLE = 'component';

const ComponentSchema = {

    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombreCultivo: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'nombre_cultivo'
    },
    nombreSensor: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        field: 'nombre_sensor'
    },
    valorMaximoTemp: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'valor_maximo_Temp'
    },
    valorMinimoTemp: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'valor_minimo_Temp'
    },
    valorMaximoHumedad: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'valor_maximo_Humedad'
    },
    valorMinimoHumedad: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'valor_minimo_Humedad'
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}

class Component extends Model {
    static associate(models) {
        this.belongsTo(models.User,
            {as: 'user'}
        );
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: COMPONENT_TABLE,
            modelName: 'Component',
            timestamps: false
        }
    }
}

module.exports = {
    COMPONENT_TABLE,
    ComponentSchema,
    Component
}
