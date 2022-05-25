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
    valorMaximo: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'valor_maximo'
    },
    valorMinimo: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'valor_minimo'
    },
    nombreNave: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'nombre_nave'
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
