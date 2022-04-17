const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
class Schema extends Model {}


Schema.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  country:{
    type: DataTypes.ENUM,
    trim: true,
    values: ["RWANDA", "ZIMBABWE", "CAR", "ETC"],
    defaultValue: "RWANDA"
  },
  province: {
    type: DataTypes.STRING,
    trim: true
  },
  district:{
    type: DataTypes.STRING,
    trim: true,
  },
  sector: {
    type: DataTypes.STRING,
    trim: true
  },
  cell: {
    type: DataTypes.STRING,
    trim: true
  },
  village: {
      type: DataTypes.STRING,
      trim: true
  }
}, 
  {
    sequelize,
    modelName: 'userLocation',
    tableName: 'user_location'
  }
)


module.exports = Schema