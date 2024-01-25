'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Playlists.hasMany(models.PlaylistContents,{foreignKey:'PlaylistId'})
    }
  }
  Playlists.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    coverUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Playlists',
  });
  return Playlists;
};