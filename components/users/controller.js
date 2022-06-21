const _ = require('lodash')
const BaseController = require('../base/controller')
const Service = require('./service')
const { errLogger } = require('../../config/logger')
const { SUCCESS, ERROR, STATUS, ROLES } = require('../../libs/constants')
const { responses: RESPONSES } = require('../../libs/constant')

class Controller extends BaseController {
    constructor() {
        super()
    }

    async save(req, res) {

        const data = await new Service().save(req.body);
        if (!_.isUndefined(data) && data.id) {
            this.sendResponse(req, res, RESPONSES.SUCCESS, { message: 'server_success.user_created' })
        } else {
            this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
        }

    }


    async list(req, res) {

        const data = await new Service().list({ req })
        if (!_.isUndefined(data)) {
            this.sendResponse(req, res, RESPONSES.SUCCESS, { data })
        } else {
            this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
        }
    }

    async update(req, res) {

        const data = await new Service().update(req.body)
        if (!_.isUndefined(data)) {
            this.sendResponse(req, res, RESPONSES.SUCCESS, { data })
        } else {
            this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
        }
    }

    async delete(req, res) {

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
                console.log(console.log({ data }))
                this.sendResponse(req, res, RESPONSES.ERROR, { message: 'server_error.try_again' })
            }
        } catch (e) {
            errLogger.error(e)
            this.sendResponse(req, res, RESPONSES.ERROR, { message: e.message })
        }
    }
}


module.exports = Controller;