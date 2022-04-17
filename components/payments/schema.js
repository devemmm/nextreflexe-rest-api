const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const Util = require('../../helpers/utils')

class Schema extends Model {}

Schema.init({
  id: {
    type: DataTypes.BIGINT,
    trim: true,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  sessionPrice: {
    type: DataTypes.DOUBLE,
    trim: true
  },
  totalPayment: {
    type: DataTypes.DOUBLE,
    trim: true
  },
  totalSession:{
    type: DataTypes.INTEGER,
    trim: true
  },
  remainsSession: {
    type: DataTypes.INTEGER,
    trim: true
  },
  paymentMethod: {
    type: DataTypes.ENUM,
    values: ['MOMO', 'BK', 'HANDS', 'EQUITY', 'SPENN'],
    defaultValue: 'HANDS',
    trim: true,
  },
  createdAt: {
    type: "TIMESTAMP",
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: "TIMESTAMP",
    defaultValue: sequelize.literal(
      "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ),
  },
},
  {
    sequelize,
    modelName: 'payment',
    tableName: 'payment',
    timestamps: false
  }
)
module.exports = Schema