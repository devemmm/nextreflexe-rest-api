const Schema = require('./schema')
const { errLogger } = require('../../config/logger')
const { STATUS } = require('../../libs/constants')
const QueryBuilder = require('../../helpers/queryBuilder')
const _ = require('lodash')
const e = require('express')


class Service {
  async save(req) {
    const data = new Schema({ ...req.body })
    return data.save().catch((e) => {
      errLogger.error(e)
    })
  }

  async list(req) {
    try {
      const { callFunction, query } = await QueryBuilder.LIST_SERVICE(req)
      let data;

      switch (callFunction) {
        case 'findOne':
          data = await Schema.findOne(query)
          break;
        default:
          data = await Schema.findAndCountAll(query)
      }

      return data;
    } catch (e) {
      errLogger.error(e)
      throw new Error(e.message)
    }
  }

  async update(req) {

    try {
      const service = await Schema.findByPk(req.params?.id)

      const updates = Object.keys(req.body)
      updates.forEach((update) => service[update] = req.body[update])

      return await service.save()
    } catch (e) {
      errLogger.error(e)
      throw new Error(e.message)
    }

  }

  async delete(req) {
    try {

      const service = await Schema.findByPk(req.params?.id)

      if (!service) {
        throw new Error("service not found")
      }
      return await Schema.destroy({ where: { id: req.params?.id } })
    } catch (e) {
      errLogger.error(e)
      throw new Error(e.message)
    }
  }

}

module.exports = Service;