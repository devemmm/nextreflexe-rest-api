const Schema = require('./schema')
const PatientService = require('../patients/service')
const { errLogger } = require('../../config/logger')
const _ = require('lodash')
const sequelize = require('../../config/database')
const QueryBuilder = require('../../helpers/queryBuilder')
const Constants = require('../../libs/constant')
const moment = require('moment')


class Service {
    async save(req) {
        req.body.password = Constants.user.PASSWORD;
        req.body.startTime = moment(req.body.startTime).format(Constants.MOMENT_TIME_FOMART)
        req.body.endTime = moment(req.body.startTime).add(1.5, 'hours').format(Constants.MOMENT_TIME_FOMART)

        try {
            const { account } = req.query;

            if (!_.isUndefined(account) && account === "false") {
                const patient = await new PatientService().save(req.body)

                if (!_.isUndefined(patient) && patient.id) {

                    req.body.patientId = patient.id;
                    const appointment = new Schema(req.body)

                    //send message to customer

                    return await appointment.save();
                }
                return patient;
            } else {
                const appointment = new Schema(req.body)

                //send message to customer
                return await appointment.save();
            }
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }

    async list(req, skipPaging = false, isActiveList = false) {
        try {
            const { callFunction, query } = await QueryBuilder.LIST_APPOINTMENT(req)
            let data;

            console.log({ callFunction, query })

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


    async update(req) {
        try {
            let appointment = await Schema.findByPk(req.params.id)

            if (!appointment || appointment.status === "DELETED") {
                throw new Error("appointment not found")
            }

            appointment.status = req.body?.status?.toUpperCase();
            return await appointment.save();
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }

    async delete(params) {
        try {
            let appointment = await Schema.findByPk(params.id)

            if (!appointment || appointment.status === "DELETED") {
                throw new Error("appointment not found")
            }
            appointment.status = "DELETED"
            return await appointment.save();
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }
}

module.exports = Service;