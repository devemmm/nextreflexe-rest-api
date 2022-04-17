const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const Location = require('./locationSchema')
const Appointment = require('../appointments/schema')
const Visit = require('../visits/schema')

class Schema extends Model {}

Schema.init({
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  managerId: {
    type: DataTypes.STRING,
    allowNull: false
  }
},  
  {
    sequelize,
    modelName: 'branch',
    tableName: 'branch'
  }
)


Schema.hasOne(Location, {
  foreignKey: {
    name: 'branchId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
})

Schema.hasMany(Appointment, {
  foreignKey:{
    name: 'branchId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})

Schema.hasMany(Visit, {
  foreignKey:{
    name: 'branchId'
  },
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})

Location.belongsTo(Schema)
Appointment.belongsTo(Schema)
Visit.belongsTo(Schema)



module.exports = Schema;