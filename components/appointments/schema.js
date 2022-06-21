const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/database");
const Visit = require("../visits/schema");

class Schema extends Model { }

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
      values: ["PENDING", "SUCCESS", "FAILED", "DELETED"],
      defaultValue: "PENDING",
      trim: true,
    },
  },
  {
    sequelize,
    modelName: "appointment",
    tableName: "appointment",
  }
);

Schema.hasOne(Visit, {
  foreignKey: {
    name: "appointmentId",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

Visit.belongsTo(Schema);

module.exports = Schema;
