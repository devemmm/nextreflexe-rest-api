const express = require('express')
const router = express.Router();
const Controller = require('./controller')
const Validator = require('../base/validator')
const RequestValidator = require('../../helpers/validator')

const controller = new Controller();
const validator = new Validator();

router 
    .route('/')
    .post(
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().CREATE_USER)
        ),
        controller.save.bind(controller)
    )

router 
    .route('/')
    .get(
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().LIST_USER)
        ),
        controller.list.bind(controller)
    )

router 
    .route('/:id')
    .patch(
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().UPDATE_USER)
        ),
        controller.update.bind(controller)
    )

router 
    .route('/:id')
    .delete(
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().DELETE_USER)
        ),
        controller.delete.bind(controller)
    )


module.exports = router