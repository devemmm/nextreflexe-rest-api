const Schema = require('./schema')
const { errLogger } = require('../../config/logger')
const LocationShema = require('./locationSchema')
const _ = require('lodash')
const sequelize = require('../../config/database')
const QueryBuilder = require('../../helpers/queryBuilder')


class Service {
    async save(params){
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
        }
    }

    async list(req, skipPaging = false, isActiveList = false){
        try {
        
            const {callFunction, query } = await QueryBuilder.BRANCH_LIST(req, true)
            let data;

            switch(callFunction){
                case 'findOne':
                    data = await Schema.findOne(query)
                    break;
                default: 
                    data = await Schema.findAndCountAll(query)
            }

            return data;
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