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
            new Validator().init(new RequestValidator().CREATE_VISIT)
        ),
        controller.save.bind(controller)
    )

router
    .route('/')
    .get(
        authorization.requireAuth.bind(authorization),
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().LIST_VISIT)
        ),
        controller.list.bind(controller)
    )

router
    .route('/:id')
    .patch(
        authorization.requireAuth.bind(authorization),
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().UPDATE_VISIT)
        ),
        controller.update.bind(controller)
    )

router
    .route('/:id')
    .delete(
        authorization.requireAuth.bind(authorization),
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().DELETE_VISIT)
        ),
        controller.delete.bind(controller)
    )



module.exports = router