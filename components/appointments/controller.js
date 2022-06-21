const _ = require('lodash')
const BaseController = require('../base/controller')
const Service = require('./service')
const { responses: RESPONSE, PRIVILAGES } = require('../../libs/constant')

class Controller extends BaseController {
    constructor() {
        super()
    }

    async save(req, res) {

        const ROUTE_PRIVILAGE = [PRIVILAGES.USER.VALUE, PRIVILAGES.SUPER_ADMIN.VALUE]

        if (!_.includes(ROUTE_PRIVILAGE, req.user.userType)) {
            return this.sendResponse(req, res, RESPONSES.UNAUTHORIZED_REQUEST, { message: 'unauthorized resources' })
        }

        const data = await new Service().save(req);
        if (!_.isUndefined(data) && data.id) {
            this.sendResponse(req, res, RESPONSE.SUCCESS, { message: 'server_success.appointment_booked' })
        } else {
            this.sendResponse(req, res, RESPONSE.ERROR, { message: 'server_error.try_again', error: data })
        }
    }

    async list(req, res) {
        const ROUTE_PRIVILAGE = [PRIVILAGES.USER.VALUE, PRIVILAGES.SUPER_ADMIN.VALUE]

        if (!_.includes(ROUTE_PRIVILAGE, req.user.userType)) {
            return this.sendResponse(req, res, RESPONSES.UNAUTHORIZED_REQUEST, { message: 'unauthorized resources' })
        }

        const data = await new Service().list(req)
        if (!_.isUndefined(data)) {
            this.sendResponse(req, res, RESPONSE.SUCCESS, { data })
        } else {
            this.sendResponse(req, res, RESPONSE.ERROR, { message: 'server_error.try_again' })
        }
    }

    async update(req, res) {
        const ROUTE_PRIVILAGE = [PRIVILAGES.USER.VALUE, PRIVILAGES.SUPER_ADMIN.VALUE]

        if (!_.includes(ROUTE_PRIVILAGE, req.user.userType)) {
            return this.sendResponse(req, res, RESPONSES.UNAUTHORIZED_REQUEST, { message: 'unauthorized resources' })
        }


        const data = await new Service().update(req.body)
        if (!_.isUndefined(data)) {
            this.sendResponse(req, res, RESPONSE.SUCCESS, { data })
        } else {
            this.sendResponse(req, res, RESPONSE.ERROR, { message: 'server_error.try_again' })
        }
    }

    async delete(req, res) {
        const ROUTE_PRIVILAGE = [PRIVILAGES.USER.VALUE, PRIVILAGES.SUPER_ADMIN.VALUE]

        if (!_.includes(ROUTE_PRIVILAGE, req.user.userType)) {
            return this.sendResponse(req, res, RESPONSES.UNAUTHORIZED_REQUEST, { message: 'unauthorized resources' })
        }


        const data = await new Service().delete(req.body)
        if (!_.isUndefined(data)) {
            this.sendResponse(req, res, RESPONSE.SUCCESS, { data })
        } else {
            this.sendResponse(req, res, RESPONSE.ERROR, { message: 'server_error.try_again' })
        }
    }
}


module.exports = Controller;