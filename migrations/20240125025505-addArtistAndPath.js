'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return [
      await queryInterface.addColumn('Songs','artist',{
        type:Sequelize.STRING
      }),
      await queryInterface.addColumn('Songs','path',{
        type:Sequelize.STRING
      })
    ]
  },

  async down (queryInterface, Sequelize) {
    return [
      await queryInterface.removeColumn('Songs','artist'),
      await queryInterface.removeColumn('Songs','path')
    ]
  }
};
