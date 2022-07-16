const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const Constant = require('../../libs/constant')

class Schema extends Model { }

Schema.init({
    id: {
        type: DataTypes.BIGINT,
        trim: true,
        autoIncrement: true,
        primaryKey: true
    },
    album: {
        type: DataTypes.STRING,
        trim: true,
        defaultValue: Constant.DEFAULT_ALBUM
    },
    image: {
        type: DataTypes.STRING,
        trim: true
    },
    thumbnail: {
        type: DataTypes.STRING,
        trim: true
    },
    redirect: {
        type: DataTypes.STRING,
        trim: true,
        defaultValue: Constant.REDIRECT
    },
    uploadedBy: {
        type: DataTypes.STRING,
        trim: true,
    }
},
    {
        sequelize,
        modelName: 'gallery',
        tableName: 'gallery',
    }
)


module.exports = Schema;