const express = require('express')
const router = express.Router();
const Controller = require('./controller')
const Validator = require('../base/validator')
const RequestValidator = require('../../helpers/validator')
const Authorization = require('../middleware/requireAuth')

const authorization = new Authorization()

const controller = new Controller();
const validator = new Validator();

router
    .route('/')
    .post(
        authorization.requireAuth.bind(authorization),
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().CREATE_BRANCH)
        ),
        controller.save.bind(controller)
    )

router
    .route('/')
    .get(
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().LIST_BRANCH)
        ),
        controller.list.bind(controller)
    )

router
    .route('/basic')
    .get(
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().LIST_BRANCH)
        ),
        controller.basic.bind(controller)
    )

router
    .route('/:id')
    .patch(
        authorization.requireAuth.bind(authorization),
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().UPDATE_BRANCH)
        ),
        controller.update.bind(controller)
    )

router
    .route('/:id')
    .delete(
        authorization.requireAuth.bind(authorization),
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().DELETE_BRANCH)
        ),
        controller.delete.bind(controller)
    )



module.exports = router