const _ = require('lodash')
const BaseController = require('../base/controller')
const Service = require('./service')
const { responses: RESPONSES, PRIVILAGES } = require('../../libs/constant')

class Controller extends BaseController {
    constructor() {
        super()
    }

    async save(req, res) {
        try {
            const data = await new Service().save(req);
            if (!_.isUndefined(data) && data.id) {
                this.sendResponse(req, res, RESPONSES.SUCCESS, { message: 'server_success.appointment_booked' })
            } else {
                this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again', error: data })
            }
        } catch (error) {
            this.sendResponse(req, res, RESPONSES.ERROR, { message: error.message })
        }
    }

    async list(req, res) {
        const ROUTE_PRIVILAGE = [PRIVILAGES.PATIENT.VALUE, PRIVILAGES.THERAPIST.VALUE, PRIVILAGES.MANAGER.VALUE, PRIVILAGES.ADMIN.VALUE, PRIVILAGES.SUPER_ADMIN.VALUE]

        try {
            if (!_.includes(ROUTE_PRIVILAGE, req.user.userType)) {
                return this.sendResponse(req, res, RESPONSES.UNAUTHORIZED_REQUEST, { message: 'unauthorized resources' })
            }

            const data = await new Service().list(req)
            if (!_.isUndefined(data)) {
                this.sendResponse(req, res, RESPONSES.SUCCESS, { data })
            } else {
                this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
            }
        } catch (error) {
            this.sendResponse(req, res, RESPONSES.ERROR, { message: error.message })
        }
    }

    async update(req, res) {
        const ROUTE_PRIVILAGE = [PRIVILAGES.MANAGER.VALUE, PRIVILAGES.ADMIN.VALUE, PRIVILAGES.SUPER_ADMIN.VALUE]

        try {
            if (!_.includes(ROUTE_PRIVILAGE, req.user.userType)) {
                return this.sendResponse(req, res, RESPONSES.UNAUTHORIZED_REQUEST, { message: 'unauthorized resources' })
            }


            const data = await new Service().update(req)
            if (!_.isUndefined(data)) {
                this.sendResponse(req, res, RESPONSES.SUCCESS, { data })
            } else {
                this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
            }

        } catch (error) {
            this.sendResponse(req, res, RESPONSES.ERROR, { message: error.message })
        }
    }

    async delete(req, res) {
        const ROUTE_PRIVILAGE = [PRIVILAGES.PATIENT.VALUE, PRIVILAGES.MANAGER.VALUE, PRIVILAGES.ADMIN.VALUE, PRIVILAGES.SUPER_ADMIN.VALUE]
        try {
            if (!_.includes(ROUTE_PRIVILAGE, req.user.userType)) {
                return this.sendResponse(req, res, RESPONSES.UNAUTHORIZED_REQUEST, { message: 'unauthorized resources' })
            }

            const data = await new Service().delete(req.params)

            if (!_.isUndefined(data)) {
                this.sendResponse(req, res, RESPONSES.SUCCESS, { data })
            } else {
                this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
            }
        } catch (error) {
            this.sendResponse(req, res, RESPONSES.ERROR, { message: error.message })
        }
    }
}


module.exports = Controller;