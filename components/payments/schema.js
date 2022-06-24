const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/database");
const { PAYMENT } = require('../../libs/constant')

class Schema extends Model { }

Schema.init(
  {
    id: {
      type: DataTypes.BIGINT,
      trim: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    sessionPrice: {
      type: DataTypes.DOUBLE,
      trim: true,
    },
    pay: {
      type: DataTypes.DOUBLE,
      trim: true,
    },
    debit: {
      type: DataTypes.DOUBLE,
      trim: true,
    },
    credit: {
      type: DataTypes.DOUBLE,
      trim: true,
    },
    totalPayment: {
      type: DataTypes.DOUBLE,
      trim: true,
    },
    totalSession: {
      type: DataTypes.INTEGER,
      trim: true,
    },
    remainsSession: {
      type: DataTypes.INTEGER,
      trim: true,
    },
    paymentMethod: {
      type: DataTypes.ENUM,
      values: PAYMENT.ENUM.METHOD,
      defaultValue: PAYMENT.ENUM.METHOD[0],
      trim: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: PAYMENT.ENUM.STATUS,
      defaultValue: PAYMENT.ENUM.STATUS[0],
      trim: true,
    },
  },
  {
    sequelize,
    modelName: "payment",
    tableName: "payment",
  }
);
module.exports = Schema;
