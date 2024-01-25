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
      Playlists.belongsTo(models.Profiles,{foreignKey:'ProfileId'})
    }
    getPlaylistCode(){
      let name = this.name.toLowerCase().replace(' ','_') + this.createdAt.getTime()
      return name
    }
    static randomEmoji(){
      let emojis = ['😄','😃','😀','😊']
      let result = emojis[Math.floor(Math.random() * emojis.length)]
      return result;
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