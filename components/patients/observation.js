const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');


class Schema extends Model {}

Schema.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    month1: {
        type: DataTypes.STRING,
        trim: true
    },
    month2: {
        type: DataTypes.STRING,
        trim: true
    },
    month3: {
        type: DataTypes.STRING,
        trim: true
    },
    month4: {
        type: DataTypes.STRING,
        trim: true
    },
    month5: {
        type: DataTypes.STRING,
        trim: true
    },
    month6: {
        type: DataTypes.STRING,
        trim: true
    },
    month7: {
        type: DataTypes.STRING,
        trim: true
    },
    month8: {
        type: DataTypes.STRING,
        trim: true
    },
    month9: {
        type: DataTypes.STRING,
        trim: true
    },
    month10: {
        type: DataTypes.STRING,
        trim: true
    },
    month11: {
        type: DataTypes.STRING,
        trim: true
    },
    year1:{
        type: DataTypes.STRING,
        trim: true
    },
    doctorId:{
        type: DataTypes.STRING,
        trim: true
    }
}, 
  {
    sequelize,
    modelName: 'observation',
    tableName: 'observation'
  }
)


module.exports = Schema;
