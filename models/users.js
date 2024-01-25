'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasOne(models.Profiles,{foreignKey:'UserId'})
    }
  }
  Users.init({
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail:{
          msg:'Must be a valid email!'
        },
        notEmpty:{
          msg:'Email must not be empty!'
        },
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Password must not be empty!'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    hooks:{
      beforeCreate(Users,options){
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(Users.password,salt)
        Users.password = hash
      }
    }
  });
  return Users;
};