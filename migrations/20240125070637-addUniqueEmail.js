'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.addConstraint('Users',{
      fields:['email'],
      type:'unique',
      name:'unique_email_at_Users'
    })
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.removeConstraint('Users','unique_email_at_Users')
  }
};
