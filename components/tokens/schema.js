const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class Schema extends Model {}

Schema.init({
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
},
  {
    sequelize,
    modelName: 'token',
    tableName: 'token'
  }
)

module.exports = Schema