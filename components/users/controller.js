const _ = require('lodash')
const BaseController = require('../base/controller')
const Service = require('./service')
const { errLogger } = require('../../config/logger')
const { responses: RESPONSES, PRIVILAGES } = require('../../libs/constant')

class Controller extends BaseController {
    constructor() {
        super()
    }

    async signup(req, res) {
        try {
            const data = await new Service().signup(req.body);
            if (!_.isUndefined(data) && data.id) {
                this.sendResponse(req, res, RESPONSES.SUCCESS, { message: 'server_success.user_created', data })
            } else {
                this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
            }
        } catch (error) {
            this.sendResponse(req, res, RESPONSES.INTERNAL_SERVER_ERROR, { message: error.message })
        }

    }

    async save(req, res) {

        const ROUTE_PRIVILAGE = [PRIVILAGES.ADMIN.VALUE, PRIVILAGES.SUPER_ADMIN.VALUE]

        if (!_.includes(ROUTE_PRIVILAGE, req.user.userType)) {
            return this.sendResponse(req, res, RESPONSES.UNAUTHORIZED_REQUEST, { message: 'unauthorized resources' })
        }

        try {
            const data = await new Service().save(req.body);

            if (!_.isUndefined(data) && data.id) {
                this.sendResponse(req, res, RESPONSES.SUCCESS, { message: 'server_success.user_created', data })
            } else {
                this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
            }
        } catch (error) {
            this.sendResponse(req, res, RESPONSES.INTERNAL_SERVER_ERROR, { message: error.message })
        }

    }

    async contactUs(req, res) {

        try {
            const data = await new Service().contactUs(req.body);

            if (!_.isUndefined(data.message)) {
                this.sendResponse(req, res, RESPONSES.SUCCESS, { message: 'server_success.messagge_sent_successful', data })
            } else {
                this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
            }
        } catch (error) {
            this.sendResponse(req, res, RESPONSES.INTERNAL_SERVER_ERROR, { message: error.message })
        }

    }

    async list(req, res) {

        const ROUTE_PRIVILAGE = [PRIVILAGES.PATIENT.VALUE, PRIVILAGES.THERAPIST.VALUE, PRIVILAGES.SUPER_ADMIN.VALUE]

        if (!_.includes(ROUTE_PRIVILAGE, req.user.userType)) {
            return this.sendResponse(req, res, RESPONSES.UNAUTHORIZED_REQUEST, { message: 'unauthorized resources' })
        }

        try {
            const data = await new Service().list({ req })
            if (!_.isUndefined(data)) {
                this.sendResponse(req, res, RESPONSES.SUCCESS, { data })
            } else {
                this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
            }
        } catch (error) {
            this.sendResponse(req, res, RESPONSES.INTERNAL_SERVER_ERROR, { message: error.message })
        }
    }

    async profile(req, res) {
        try {
            const data = await new Service().profile({ req })
            if (!_.isUndefined(data)) {
                this.sendResponse(req, res, RESPONSES.SUCCESS, { data })
            } else {
                this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
            }
        } catch (error) {
            this.sendResponse(req, res, RESPONSES.INTERNAL_SERVER_ERROR, { message: error.message })
        }
    }

    async listTeam(req, res) {
        try {
            const data = await new Service().listTeam({ req })
            if (!_.isUndefined(data)) {
                this.sendResponse(req, res, RESPONSES.SUCCESS, { data })
            } else {
                this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
            }
        } catch (error) {
            this.sendResponse(req, res, RESPONSES.INTERNAL_SERVER_ERROR, { message: error.message })
        }
    }

    async update(req, res) {

        const ROUTE_PRIVILAGE = [PRIVILAGES.PATIENT.VALUE, PRIVILAGES.THERAPIST.VALUE, PRIVILAGES.SUPER_ADMIN.VALUE]

        if (!_.includes(ROUTE_PRIVILAGE, req.user.userType)) {
            return this.sendResponse(req, res, RESPONSES.UNAUTHORIZED_REQUEST, { message: 'unauthorized resources' })
        }

        const data = await new Service().update(req.body)
        if (!_.isUndefined(data)) {
            this.sendResponse(req, res, RESPONSES.SUCCESS, { data })
        } else {
            this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
        }
    }

    async delete(req, res) {

        const ROUTE_PRIVILAGE = [PRIVILAGES.PATIENT.VALUE, PRIVILAGES.THERAPIST.VALUE, PRIVILAGES.SUPER_ADMIN.VALUE]

        if (!_.includes(ROUTE_PRIVILAGE, req.user.userType)) {
            return this.sendResponse(req, res, RESPONSES.UNAUTHORIZED_REQUEST, { message: 'unauthorized resources' })
        }

        const data = await new Service().delete(req.body)
        if (!_.isUndefined(data)) {
            this.sendResponse(req, res, RESPONSES.SUCCESS, { data })
        } else {
            this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
        }
    }

    async signin(req, res) {
        try {
            const data = await new Service().signin(req, res)

            if (!_.isUndefined(data)) {
                this.sendResponse(req, res, RESPONSES.SUCCESS, { data })
            } else {
                this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
            }
        } catch (e) {
            errLogger.error(e)
            this.sendResponse(req, res, RESPONSES.ERROR, { message: e.message })
        }
    }

    async signout(req, res) {
        try {
            const data = await new Service().signout(req.headers.authorization.replace('Bearer ', ""))

            if (!_.isUndefined(data)) {
                this.sendResponse(req, res, RESPONSES.SUCCESS, { data })
            } else {
                this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
            }
        } catch (e) {
            errLogger.error(e)
            this.sendResponse(req, res, RESPONSES.ERROR, { message: e.message })
        }
    }
}


module.exports = Controller;