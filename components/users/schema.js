const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const Location = require('../location/schema')
const Token = require('../tokens/schema')
const Appointment = require('../appointments/schema')
const Visit = require('../visits/schema')
const Branch = require('../branches/schema')
const Observation = require('../patients/observation')
const Payment = require('../payments/schema')
const { AVATAR, USER_STATUS, USER_TYPE } = require('../../libs/constant')

class Schema extends Model { }

Schema.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    trim: true,
    allowNull: false,
    autoIncrement: true
  },
  fname: {
    type: DataTypes.STRING,
    trim: true
  },
  lname: {
    type: DataTypes.STRING,
    trim: true,
  },
  nid: {
    type: DataTypes.STRING,
    trim: true
  },
  phone: {
    type: DataTypes.STRING,
    trim: true
  },
  dob: {
    type: DataTypes.STRING,
    trim: true
  },
  email: {
    type: DataTypes.STRING,
    trim: true
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
  status: {
    type: DataTypes.ENUM,
    values: USER_STATUS,
    defaultValue: 'ACTIVE',
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
    modelName: 'user',
    tableName: 'user'
  }
)

Schema.hasOne(Location, {
  foreignKey: {
    name: 'userId'
  }
})

Branch.hasOne(Schema, {
  foreignKey: {
    name: 'branchId'
  }
})

Schema.hasMany(Token, {
  foreignKey: {
    name: 'userId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
})

Schema.hasMany(Appointment, {
  foreignKey: {
    name: 'patientId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
})

Schema.hasMany(Visit, {
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


Schema.hasMany(Payment, {
  foreignKey: {
    name: 'patientId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})

Location.belongsTo(Schema)
Observation.belongsTo(Schema)
Payment.belongsTo(Schema)
Schema.belongsTo(Branch)
Token.belongsTo(Schema)
Appointment.belongsTo(Schema)
Visit.belongsTo(Schema)

module.exports = Schema;