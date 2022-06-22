const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const Payment = require('../payments/schema')
const { SERVICE_AVATAR } = require('../../libs/constant')

class Schema extends Model { }

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
  description: {
    type: DataTypes.STRING,
    trim: true,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: SERVICE_AVATAR
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
  foreignKey: {
    name: 'serviceId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})

Payment.belongsTo(Schema)

module.exports = Schema