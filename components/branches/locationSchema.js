const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class Schema extends Model {}

Schema.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  country:{
    type: DataTypes.STRING,
    defaultValue: 'RWANDA',
  },
  province: {
    type: DataTypes.STRING,
    allowNull: false
  },
  district:{
    type: DataTypes.STRING,
  },
  sector: {
    type: DataTypes.STRING,
  },
  cell: {
    type: DataTypes.STRING,
  },
  village:{
    type: DataTypes.STRING,
  },
  createdBy:{
    type: DataTypes.STRING,
  }

},{
    sequelize,
    modelName: 'branchLocation',
    tableName: 'branch_location'
})

module.exports = Schema;