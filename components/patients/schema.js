const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const Location = require('../location/schema')
const Observation = require('./observation')
const Appointment = require('../appointments/schema')
const Visit = require('../visits/schema')
const Payment = require('../payments/schema')
const Token = require('../tokens/schema')
const { AVATAR, USER_STATUS, USER_TYPE } = require('../../libs/constant')


class Schema extends Model { }

Schema.init({
    id: {
        type: DataTypes.BIGINT,
        trim: true,
        autoIncrement: true,
        primaryKey: true
    },
    fname: {
        type: DataTypes.STRING,
        trim: true
    },
    lname: {
        type: DataTypes.STRING,
        trim: true
    },
    email: {
        type: DataTypes.STRING,
        trim: true,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        trim: true,
        unique: true
    },
    dob: {
        type: DataTypes.STRING,
        trim: true
    },
    nid: {
        type: DataTypes.STRING,
        trim: true,
        unique: true
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: AVATAR
    },
    emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    phoneVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    diagnosis: {
        type: DataTypes.STRING,
        trim: true
    },
    status: {
        type: DataTypes.ENUM,
        values: USER_STATUS,
        defaultValue: "ACTIVE",
    },
    userType: {
        type: DataTypes.ENUM,
        values: USER_TYPE,
        defaultValue: 'PATIENT',
    },
    password: {
        type: DataTypes.STRING,
        trim: true
    }
},
    {
        sequelize,
        modelName: 'patient',
        tableName: 'patient',
    }
)

Schema.hasMany(Token, {
    foreignKey: {
        name: 'patientId'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
})


Schema.hasOne(Location, {
    foreignKey: {
        name: 'patientId'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
})

Schema.hasMany(Observation, {
    foreignKey: {
        name: 'patientId'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})

Schema.hasMany(Appointment, {
    foreignKey: {
        name: 'patientId'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})

Schema.hasMany(Visit, {
    foreignKey: {
        name: 'patientId'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})

Schema.hasMany(Payment, {
    foreignKey: {
        name: 'patientId'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})

Location.belongsTo(Schema)
Observation.belongsTo(Schema)
Appointment.belongsTo(Schema)
Visit.belongsTo(Schema)
Payment.belongsTo(Schema)
Token.belongsTo(Schema)


module.exports = Schema;