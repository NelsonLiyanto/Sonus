'use strict';
const fs = require('fs').promises
/** @type {import('sequelize-cli').Migration} */

function addCreatedAndUpdated(array){
  return array.map(el=>{
    el.createdAt = new Date()
    el.updatedAt = new Date()
    return el
  })
}

module.exports = {
  async up (queryInterface, Sequelize) {
    let profiles = addCreatedAndUpdated(JSON.parse(await fs.readFile('./data/profiles.json','utf-8')))
    let users = addCreatedAndUpdated(JSON.parse(await fs.readFile('./data/users.json','utf-8')))
    let playlists = addCreatedAndUpdated(JSON.parse(await fs.readFile('./data/playlists.json','utf-8')))
    let playlistcontents = addCreatedAndUpdated(JSON.parse(await fs.readFile('./data/playlistContents.json','utf-8')))
    let songs = addCreatedAndUpdated(JSON.parse(await fs.readFile('./data/songs.json','utf-8')))


    return [
      await queryInterface.bulkInsert('Users',users),
      await queryInterface.bulkInsert('Playlists',playlists),
      await queryInterface.bulkInsert('Songs',songs),
      await queryInterface.bulkInsert('Profiles',profiles),
      await queryInterface.bulkInsert('PlaylistContents',playlistcontents),
    ]
  },

  async down (queryInterface, Sequelize) {
    return [
      await queryInterface.bulkDelete('Profiles',null),
      await queryInterface.bulkDelete('PlaylistContents',null),
      await queryInterface.bulkDelete('Users',null),
      await queryInterface.bulkDelete('Playlists',null),
      await queryInterface.bulkDelete('Songs',null),

    ]
  }
};
