const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const Location = require('./locationSchema')
const Token = require('../tokens/schema')
const Appointment = require('../appointments/schema')
const Visit = require('../visits/schema')

class Schema extends Model { }

Schema.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    trim: true,
    allowNull: false
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
  status: {
    type: DataTypes.ENUM,
    values: ['ACTIVE', 'INACTIVE', 'DELETED'],
    defaultValue: 'ACTIVE',
  },
  userType: {
    type: DataTypes.ENUM,
    values: ['USER', 'ADMIN', 'SUPER_ADMIN'],
    defaultValue: 'USER',
  },
  branchId: {
    type: DataTypes.INTEGER,
    defaultValue: 'RW01',
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
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
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
    name: 'doctorId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
})

Schema.hasMany(Visit, {
  foreignKey: {
    name: 'doctorId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
})

Location.belongsTo(Schema)
Token.belongsTo(Schema)
Appointment.belongsTo(Schema)
Visit.belongsTo(Schema)

module.exports = Schema;