const Schema = require('./schema')
const { errLogger } = require('../../config/logger')
const { STATUS } = require('../../libs/constants')
const QueryBuilder = require('../../helpers/queryBuilder')
const _ = require('lodash')
const e = require('express')


class Service {
    async save (req) {
      const data = new Schema({...req.body})
      return data.save().catch((e) => {
        errLogger.error(e)
      })
    }

    async list(req, skipPaging = false){
      return  QueryBuilder.LIST_SERVICE(req, skipPaging).catch((e)=>{
        errLogger.error(e)
      })
    }

    async update(req){
      return await QueryBuilder.UPDATE_SERVICE(req).catch((e)=>{
        errLogger.error(e)
      })
  
    }

    async delete(req){ 
      return await QueryBuilder.DELETE_SERVICE(req).catch((e)=>{
        errLogger.error(e)
      })
    }
    
}

module.exports = Service;