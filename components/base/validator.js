const BaseController = require('./controller')
const { SUCCESS, ERROR } = require('../../libs/constants')
const _ = require('lodash')

class Validator {
  init (validator) {
    this.validator = validator
    return this
  }

  getRequestData (req) {
    let reqData
    const method = req.method
    const path = req.route.path
    switch (method) {
      case 'POST':
      case 'PUT':
        reqData = req.body
        break
      case 'GET':
      case 'DELETE':
        reqData = path === '/' ? req.query : req.params
        break
      default:
        reqData = req.body
    }

    return reqData
  }

  validateRequest (req, res, next) {
    const userData = req.body && req.body.userData
    if (userData) {
      delete req.body.userData
    }
    const reqData = this.getRequestData(req)

    const r = this.validator.validate(reqData)

    
    if (_.isUndefined(r.error)) {
      if (userData) {
        req.userData = userData
      }
      next()
    } else {
      const joiMsg = r.error.details[0].message
      new BaseController().sendResponse(req, res, ERROR.CODE, { message: `server_error.${joiMsg}` })
    }
  }

  validateResponse (req, res) {
    const data = res.data
    if (!_.isUndefined(data)) {
      if (!_.has(data, 'error')) {
        data.created = data.modified
        const allowedAttr = ['id', 'created']
        const formattedData = this.permittedParams(data, allowedAttr)
        const result = this.validator.validate(formattedData)
        if (result.error === null) {
          this.sendResponse(req, res, SUCCESS.CODE, [result.value])
        } else {
          this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.invalid_params' })
        }
        res.json({ success: true })
      } else {
        res.json({ success: false })
      }
    }
  }
}

module.exports = Validator