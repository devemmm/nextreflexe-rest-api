const Schema = require('./schema')
const { errLogger } = require('../../config/logger')
const _ = require('lodash')
const sequelize = require('../../config/database')
const QueryBuilder = require('../../helpers/queryBuilder')


class Service {
    async save(req){
        const data = new Schema(req.body)

        console.log(data)
        return  data.save().catch((e)=>{
            errLogger.error(e)
        })
    }

    async list(req, skipPaging = false, isActiveList = false){
        try {
        
            const metadata = await QueryBuilder.LIST_PAYMENT(req)

            return { patients: metadata, rows: metadata.length}
        } catch (error) {
            errLogger.error(e)
        }
    }


    async update(params){
        try {

            const query = "UPDATE payment SET createdBy='Emmanuell' where branchId='RW01';"
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