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
      Profiles.hasOne(models.Playlists,{foreignKey:'ProfileId'})
    }
  }
  Profiles.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Name must not be empty!'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate:{
        notEmpty:{
          msg:'Description must not be empty!'
        }
      }
    },
    pfpUrl: {
      type: DataTypes.TEXT,
      validate:{
        notEmpty:{
          msg:'Profile picture must not be empty!'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg:'UserId must not be empty!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profiles',
  });
  return Profiles;
};