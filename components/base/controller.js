const _ = require('lodash')
const appConst = require('../../libs/constants')
const moment = require('moment')
const { errLogger } = require('../../config/logger')
const Util = require('../../helpers/utils')
const { responses: RESPONSE } = require('../../libs/constant')

const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
const { ERROR, SUCCESS } = appConst

class Controller {
  constructor() {
    this.response = {}
  }

  static responseFormat() {
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

  static formatLogs(req, res) {
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

  static errorResponse({ req, STATUS, info }) {
    const response = Controller.responseFormat()
    response.status.code = STATUS.CODE
    response.status.message = STATUS.MSG


    if (_.has(info, 'data')) {
      response.data = info.data
    } else {
      delete response.data
    }

    if (_.has(info, 'message')) {
      response.message = info.message
    }

    if (_.has(info, 'error')) {
      response.error = info.error
    }

    const logData = Controller.formatLogs(req, response)
    errLogger.error(logData)

    return response
  }

  static successResponse({ STATUS, resToSend }) {
    const response = Controller.responseFormat()
    response.status.code = STATUS.SUCCESS
    response.status.message = STATUS.SUCCESS

    if (_.has(resToSend, 'data')) {
      response.data = resToSend.data
    } else {
      delete response.data
    }
    if (_.has(resToSend, 'count')) {
      response.count = resToSend.count
    } else {
      delete response.count
    }
    if (_.has(resToSend, 'message')) {
      response.message = resToSend.message
    } else {
      delete response.message
    }
    return response
  }

  sendResponse(req, res, STATUS, resToSend) {

    this.response = {}
    if (STATUS.CODE === RESPONSE.BAD_REQUEST.CODE || STATUS.CODE === RESPONSE.ERROR.CODE || STATUS.CODE === RESPONSE.UNAUTHORIZED_REQUEST.CODE || STATUS.CODE === RESPONSE.RESOURCE_NOT_FOUND.CODE) {
      this.response = Controller.errorResponse({ req, STATUS, info: resToSend })
    } else {
      this.response = Controller.successResponse({ STATUS, resToSend })
    }
    return res.status(STATUS.CODE).json(this.response)
  }

  permittedParams(params, acceptedKeys) {
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