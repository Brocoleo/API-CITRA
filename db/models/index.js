const {User, UserSchema } = require('./user.model');
const {Component, ComponentSchema} = require('./component.model');
const {Historial, HistorialSchema} = require('./historial.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Component.init(ComponentSchema, Component.config(sequelize));
    Historial.init(HistorialSchema, Historial.config(sequelize));


    User.associate(sequelize.models);
    Component.associate(sequelize.models);
}


module.exports = setupModels;
