const Schema = require('./schema')
const { errLogger } = require('../../config/logger')
const LocationShema = require('../location/schema')
const _ = require('lodash')
const sequelize = require('../../config/database')
const QueryBuilder = require('../../helpers/queryBuilder')


class Service {
    async save(params) {
        try {

            const data = new Schema({
                id: params.id,
                name: params.name,
                managerId: params.managerId
            })
            const location = new LocationShema(params.location)
            location.branchId = data.id;

            await data.save()
            await location.save()
            return data;
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }

    async list(req) {
        try {

            const { callFunction, query } = await QueryBuilder.BRANCH_LIST(req, true)
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
            const branch = await Schema.findByPk(req.params?.id)

            const updates = Object.keys(req.body)
            updates.forEach((update) => branch[update] = req.body[update])

            return await branch.save()
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }

    async delete(req) {
        try {
            const branch = await Schema.findByPk(req.params?.id)
            if (!branch) {
                throw new Error("branch not found")
            }
            return await Schema.destroy({ where: { id: req.params?.id } })
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }
}

module.exports = Service;