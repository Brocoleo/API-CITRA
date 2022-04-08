const { Model, DataTypes } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
    id:{
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    img: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue: null
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER_ROLE'
    },
    google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING,
    }
}

class User extends Model {
    static associate(models) {
        this.hasMany(models.Component, {
            as: 'components',
            foreignKey: 'userId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}

module.exports = {
    USER_TABLE,
    UserSchema,
    User
}
