'use strict';

const { HistorialSchema, HISTORIAL_TABLE } = require('./../models/historial.model');


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(HISTORIAL_TABLE, HistorialSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(HISTORIAL_TABLE);
  }
};
