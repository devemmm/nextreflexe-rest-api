const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const Location = require('./locationSchema')
const Observation = require('./observation')
const Appointment = require('../appointments/schema')
const Visit = require('../visits/schema')
const Payment = require('../payments/schema')

class Schema extends Model {}

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
  lname:{
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
  diagnosis:{
    type: DataTypes.STRING,
    trim: true
  },
  status: {
    type: DataTypes.ENUM,
    values: ['ACTIVE', 'INACTIVE', 'DELETED'],
    defaultValue: "ACTIVE",
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

Schema.hasOne(Location, {
  foreignKey: {
    name: 'patientId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
})

Schema.hasMany(Observation, {
  foreignKey:{
    name: 'patientId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})

Schema.hasMany(Appointment, {
  foreignKey:{
    name: 'patientId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})

Schema.hasMany(Visit, {
  foreignKey:{
    name: 'patientId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})

Schema.hasMany(Payment, {
  foreignKey:{
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


module.exports = Schema;