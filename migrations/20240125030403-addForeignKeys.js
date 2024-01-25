'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return [
      await queryInterface.addConstraint('Profiles',{
        fields:['PlaylistId'],
        type:'foreign key',
        name:'fkey_PlaylistId_from_Playlists_at_Profiles',
        references:{
          table:'Playlists',
          field:'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      await queryInterface.addConstraint('Profiles',{
        fields:['UserId'],
        type:'foreign key',
        name:'fkey_UserId_from_Users_at_Profiles',
        references:{
          table:'Users',
          field:'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      await queryInterface.addConstraint('PlaylistContents',{
        fields:['PlaylistId'],
        type:'foreign key',
        name:'fkey_PlaylistId_from_Playlists_at_PlaylistContents',
        references:{
          table:'Playlists',
          field:'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      await queryInterface.addConstraint('PlaylistContents',{
        fields:['SongId'],
        type:'foreign key',
        name:'fkey_SongsId,from_Songs_at_PlaylistContents',
        references:{
          table:'Songs',
          field:'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ]
  },

  async down (queryInterface, Sequelize) {
    return [
      await queryInterface.removeConstraint('Profiles','fkey_PlaylistId_from_Playlists_at_Profiles'),
      await queryInterface.removeConstraint('Profiles','fkey_UserId_from_Users_at_Profiles'),
      await queryInterface.removeConstraint('PlaylistContents','fkey_PlaylistId_from_Playlists_at_PlaylistContents'),
      await queryInterface.removeConstraint('PlaylistContents','fkey_SongsId,from_Songs_at_PlaylistContents')

    ]
  }
};
