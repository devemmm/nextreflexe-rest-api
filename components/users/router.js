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
    .route('/signup')
    .post(
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().CREATE_USER)
        ),
        controller.save.bind(controller)
    )

router
    .route('/')
    .get(
        authorization.requireAuth.bind(authorization),
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().LIST_USER)
        ),
        controller.list.bind(controller)
    )

router
    .route('/team')
    .get(
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().LIST_USER)
        ),
        controller.listTeam.bind(controller)
    )

router
    .route('/:id')
    .patch(
        authorization.requireAuth.bind(authorization),
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().UPDATE_USER)
        ),
        controller.update.bind(controller)
    )

router
    .route('/:id')
    .delete(
        authorization.requireAuth.bind(authorization),
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().DELETE_USER)
        ),
        controller.delete.bind(controller)
    )

router
    .route('/signin')
    .post(
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().SIGNIN)
        ),
        controller.signin.bind(controller)
    )


module.exports = router