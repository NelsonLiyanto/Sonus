'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Profiles','PlaylistCover',{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Profiles','PlaylistCover',{
      type: Sequelize.TEXT
    })

  }
};
