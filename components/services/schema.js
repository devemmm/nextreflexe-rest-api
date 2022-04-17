const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const Payment = require('../payments/schema')

class Schema extends Model {}

Schema.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    trim: true
  },
  description:{
    type: DataTypes.STRING,
    trim: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'ACTIVE',
    enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
  },
  createdBy: {
    type: DataTypes.STRING,
    trim: true
  }
}, 
  {
    sequelize,
    modelName: 'service',
    tableName: 'service'
  }
)


Schema.hasMany(Payment, {
  foreignKey:{
    name: 'serviceId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})

module.exports = Schema