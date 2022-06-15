const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/database");
const Payment = require("../payments/schema");

class Schema extends Model {}

Schema.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    startTime: {
      type: DataTypes.STRING,
      trim: true,
    },
    endTime: {
      type: DataTypes.STRING,
      trim: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["PENDING", "SUCCESS", "FAILED"],
      defaultValue: "PENDING",
      trim: true,
    },
  },
  {
    sequelize,
    modelName: "visit",
    tableName: "visit",
  }
);

Schema.hasOne(Payment, {
  foreignKey: {
    name: "visitId",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Payment.belongsTo(Schema);

module.exports = Schema;
