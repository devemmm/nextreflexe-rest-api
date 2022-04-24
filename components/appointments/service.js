const Schema = require('./schema')
const PatientService = require('../patients/service')
const { errLogger } = require('../../config/logger')
const _ = require('lodash')
const sequelize = require('../../config/database')
const QueryBuilder = require('../../helpers/queryBuilder')
const Constants = require('../../libs/constant')
const moment = require('moment')


class Service {
    async save(req){
        req.body.password = Constants.user.PASSWORD;
        req.body.userId = req.body.doctorId;
        req.body.startTime = moment(req.body.startTime).format(Constants.MOMENT_TIME_FOMART)
        req.body.endTime = moment(req.body.startTime).add(1.5, 'hours').format(Constants.MOMENT_TIME_FOMART)
                   
        try {
            const { account } = req.query;

            if(!_.isUndefined(account) && account === "false"){
                const patient = await new PatientService().save(req.body)
                
                if(!_.isUndefined(patient) && patient.id){

                    req.body.patientId = patient.id;
                    const appointment = new Schema(req.body)

                    //send message to customer
        
                    return  await appointment.save();
                }
                return patient;
            }else{
                const appointment = new Schema(req.body)
                
                //send message to customer
                return await appointment.save();
            }
        } catch (error) {
            errLogger.error(e)
            return false
        }
    }

    async list(req, skipPaging = false, isActiveList = false){
        try {
        
            const metadata = await QueryBuilder.LIST_APPOINTMENT(req)
            return { appointment: metadata, rows: metadata.length}
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