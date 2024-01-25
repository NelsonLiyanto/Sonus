'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profiles.belongsTo(models.Users,{foreignKey:'UserId'})
    }
  }
  Profiles.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    pfpUrl: DataTypes.TEXT,
    PlaylistId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profiles',
  });
  return Profiles;
};