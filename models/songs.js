'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Songs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Songs.hasMany(models.PlaylistContents,{foreignKey:'SongId'})
    }
  }
  Songs.init({
    title: DataTypes.STRING,
    songImage: DataTypes.TEXT,
    duration: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    artist:DataTypes.STRING,
    path:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Songs',
  });
  return Songs;
};