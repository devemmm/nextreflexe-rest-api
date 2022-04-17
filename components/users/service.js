const Schema = require('./schema')
const { errLogger } = require('../../config/logger')
const LocationShema = require('./locationSchema')
const _ = require('lodash')
const sequelize = require('../../config/database')
const QueryBuilder = require('../../helpers/queryBuilder')


class Service {
    async save(params){
        try {

            const data = new Schema(params)

            const location = new LocationShema({
                userId: data.id,
                ...params.location
            })
        
            await data.save()
            await location.save()

            return data
        } catch (e) {
            console.log(e.message)
            errLogger.error(e)
        }
    }

    async list(req, skipPaging = false, isActiveList = false){
        try {
        
            const metadata = await QueryBuilder.USER_LIST(req, sequelize, true)

            return { users: metadata, rows: metadata.length}
        } catch (error) {
            errLogger.error(e)
        }
    }


    async update(params){
        try {

            const query = "UPDATE branch_location SET createdBy='Emmanuell' where branchId='RW01';"
            const [results, metadata] = await sequelize.query(query);

            if( metadata.affectedRows > 0 && metadata.changedRows > 0){
                return {resullt: 'branch_updated_successfull'}
            }

            return {resullt: 'something_went_wrong'};
        } catch (error) {
            errLogger.error(e)
        }
    }

    async delete(params){
        try {
            return {data: []}
        } catch (error) {
            errLogger.error(e)
        }
    }
}

module.exports = Service;