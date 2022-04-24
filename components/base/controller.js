const _ = require('lodash')
const appConst = require('../../libs/constants')
const moment = require('moment')
const { errLogger } = require('../../config/logger')
const Util = require('../../helpers/utils')

const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
const { ERROR, SUCCESS } = appConst

class Controller {
  constructor () {
    this.response = {}
  }

  static responseFormat () {
    return {
      responseTime: new Util().rightNow(),
      code: '',
      status: {
          code: '',
          message: ''
      },
      message: '',
      data: {}
    }
  }

  static formatLogs (req, res) {
    let id
    let role
    let reqIp

    if (_.has(req, 'userData')) {
      id = req.userData.id ? req.userData.id : ''
      role = req.userData.role ? req.userData.role : ''
    }

    if (_.has(req, 'headers') && _.has(req.headers, 'x-client-ip')) {
      reqIp = req.headers['x-client-ip']
    } else {
      reqIp = req.ip ? req.ip : ''
    }

    return {
      reqTime: currentTime,
      reqUrl: req.url ? req.url : '',
      reqMethod: req.method ? req.method : '',
      reqIp,
      reqParams: req.params ? req.params : '',
      reqBody: req.body ? req.body : '',
      reqQuery: req.query ? req.query : '',
      reqUserId: id,
      reqUserRole: role,
      response: res
    }
  }

  static errorResponse (req, error) {
    const response = Controller.responseFormat()
    response.status.code = ERROR.CODE
    response.status.message = ERROR.MSG

    if (_.has(error, 'data')) {
      response.data = error.data
    } else {
      delete response.data
    }

    if (_.has(error, 'message')) {
      response.message = error.message
    }

    if (_.has(error, 'error')){
      response.error = error.error
    }

    const logData = Controller.formatLogs(req, response)
    errLogger.error(logData)

    return response
  }

  static successResponse (success) {
    const response = Controller.responseFormat()
    response.status.code = SUCCESS.CODE
    response.status.message = SUCCESS.MSG

    if (_.has(success, 'data')) {
      response.data = success.data
    } else {
      delete response.data
    }
    if (_.has(success, 'count')) {
      response.count = success.count
    } else {
      delete response.count
    }
    if (_.has(success, 'message')) {
      response.message = success.message
    } else {
      delete response.message
    }
    return response
  }

  sendResponse (req, res, type, resToSend) {
    this.response = {}
    if (type === ERROR.CODE) {
      this.response = Controller.errorResponse(req, resToSend)
    } else {
      this.response = Controller.successResponse(resToSend)
    }
    return res.status(type).json(this.response)
  }

  permittedParams (params, acceptedKeys) {
    if (!_.isEmpty(params)) {
      const mappedParams = _.mapKeys(params, function (value, key) {
        const paramsMap = {}
        return paramsMap[key] || key
      })
      return _.pick(mappedParams, acceptedKeys)
    }
    return {}
  }
}

module.exports = Controller