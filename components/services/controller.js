const _ = require('lodash')
const BaseController = require('../base/controller')
const Service = require('./service')
const { SUCCESS, ERROR, STATUS, ROLES } = require('../../libs/constants')

class Controller extends BaseController {
  constructor () {
    super()
    this.userCanGetListUpdateCreate = [ROLES.SUPER_ADMIN]
  }

  async save (req, res) {
    // if (_.includes(this.userCanGetListUpdateCreate, req.userData.role)) {
      if (true) {

      const data = await new Service().save(req)
      if (!_.isUndefined(data) && data.id) {
        this.sendResponse(req, res, SUCCESS.CODE, { message: 'server_success.created_service' })
      } else {
        this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
      }
    } else {
      this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.unauthorized' })
    }
  }

  async list (req, res) {
    let skipPaging = false
    if (req.query && req.query.skipPagination && req.query.skipPagination === 'true') {
      skipPaging = true
    }
    const data = await new Service().list(req, skipPaging)

    if (!_.isUndefined(data) && data.length > 0) {
      this.sendResponse(req, res, SUCCESS.CODE, { data, count: data.length })
    } else {
      this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.no_records_found' })
    }
  }

  async update (req, res){

    const data = await new Service().update(req)
    if(!_.isUndefined(data)){
        this.sendResponse(req, res, SUCCESS.CODE, {data})
    }else{
        this.sendResponse(req, res, ERROR.CODE, {message: 'server_error.try_again'})
    }
  }

  async delete (req, res){

    const data = await new Service().delete(req)
    if(!_.isUndefined(data)){
        this.sendResponse(req, res, SUCCESS.CODE, {data})
    }else{
        this.sendResponse(req, res, ERROR.CODE, {message: 'server_error.try_again'})
    }
}
}


module.exports = Controller;