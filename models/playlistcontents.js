'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistContents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        PlaylistContents.belongsTo(models.Playlists,{foreignKey:'PlaylistId'})
        PlaylistContents.belongsTo(models.Songs,{foreignKey:'SongId'})
    }
  }
  PlaylistContents.init({
    PlaylistId: DataTypes.INTEGER,
    SongId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlaylistContents',
  });
  return PlaylistContents;
};