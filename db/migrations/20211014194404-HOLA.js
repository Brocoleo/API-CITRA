'use strict';

const { UserSchema, USER_TABLE} = require('./../models/user.model');
const { ComponentSchema, COMPONENT_TABLE} = require('./../models/component.model');
const { SensorSchema, SENSOR_TABLE } = require('./../models/sensor.model');
const { ComponentSensorSchema, COMPONENT_SENSOR_TABLE } = require('./../models/component-sensor.model');
const { HistorialSchema, HISTORIAL_TABLE } = require('./../models/historial.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(COMPONENT_TABLE, ComponentSchema);
    await queryInterface.createTable(SENSOR_TABLE, SensorSchema);
    await queryInterface.createTable(COMPONENT_SENSOR_TABLE, ComponentSensorSchema);
    await queryInterface.createTable(HISTORIAL_TABLE, HistorialSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.drop(USER_TABLE);
    await queryInterface.dropTable(COMPONENT_TABLE);
    await queryInterface.dropTable(SENSOR_TABLE);
    await queryInterface.dropTable(COMPONENT_SENSOR_TABLE);
    await queryInterface.dropTable(HISTORIAL_TABLE);
  }
};
