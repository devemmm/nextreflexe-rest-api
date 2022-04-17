const _ = require('lodash')
const BaseController = require('../base/controller')
const Service = require('./service')
const  { SUCCESS, ERROR, STATUS, ROLES } = require('../../libs/constants')

class Controller extends BaseController {
    constructor(){
        super()
    }


    async save (req, res){

        const data = await new Service().save(req.body);
        if(!_.isUndefined(data) && data.id){
            this.sendResponse(req, res, SUCCESS.CODE, { message: 'server_success.created_branch' })
        }else{
            this.sendResponse(req, res, ERROR.CODE, { message: 'server_error.try_again' })
        }

    }


    async list (req, res){

        const data = await new Service().list(req)
        if(!_.isUndefined(data)){
            this.sendResponse(req, res, SUCCESS.CODE, {data})
        }else{
            this.sendResponse(req, res, ERROR.CODE, {message: 'server_error.try_again'})
        }
    }

    async update (req, res){

        const data = await new Service().update(req.body)
        if(!_.isUndefined(data)){
            this.sendResponse(req, res, SUCCESS.CODE, {data})
        }else{
            this.sendResponse(req, res, ERROR.CODE, {message: 'server_error.try_again'})
        }
    }

    async delete (req, res){

        const data = await new Service().delete(req.body)
        if(!_.isUndefined(data)){
            this.sendResponse(req, res, SUCCESS.CODE, {data})
        }else{
            this.sendResponse(req, res, ERROR.CODE, {message: 'server_error.try_again'})
        }
    }
}


module.exports = Controller;