const Schema = require('../users/schema')
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
            return { code: e.parent.code, message: e.parent.sqlMessage }
        }
    }

    async list(req, skipPaging = false, isActiveList = false) {
        try {

            const metadata = await QueryBuilder.PATIENT_LIST(req)

            return { patients: metadata, rows: metadata.length }
        } catch (error) {
            errLogger.error(e)
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
        } catch (error) {
            errLogger.error(e)
        }
    }

    async delete(params) {
        try {
            return { data: [] }
        } catch (error) {
            errLogger.error(e)
        }
    }
}

module.exports = Service;