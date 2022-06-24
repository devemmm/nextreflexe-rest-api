const Schema = require('./schema')
const { errLogger } = require('../../config/logger')
const LocationShema = require('../location/schema')
const _ = require('lodash')
const sequelize = require('../../config/database')
const QueryBuilder = require('../../helpers/queryBuilder')


class Service {
    async save(params) {
        try {

            const data = new Schema(params)

            const location = new LocationShema(params.location)
            await data.save();

            location.patientId = data.id
            await location.save()

            return data;
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }

    async list(req, skipPaging = false, isActiveList = false) {
        try {
            const { callFunction, query } = await QueryBuilder.PATIENT_LIST(req)
            let data;

            switch (callFunction) {
                case "findOne":
                    data = await Schema.findOne(query);
                    break;
                default:
                    data = await Schema.findAndCountAll(query);
            }
            return data;
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }


    async update(params) {
        try {

            const query = "UPDATE patient SET createdBy='Emmanuell' where branchId='RW01';"
            const [results, metadata] = await sequelize.query(query);

            if (metadata.affectedRows > 0 && metadata.changedRows > 0) {
                return { resullt: 'branch_updated_successfull' }
            }

            return { resullt: 'something_went_wrong' };
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }

    async delete(params) {
        try {
            return { data: [] }
        } catch (error) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }
}

module.exports = Service;