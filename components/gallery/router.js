const express = require('express')
const router = express.Router();
const Controller = require('./controller')
const Validator = require('../base/validator')
const RequestValidator = require('../../helpers/validator')
const Authorization = require('../middleware/requireAuth')
const upload = require('../../config/multer')

const authorization = new Authorization()

const controller = new Controller();
const validator = new Validator();

router
    .route('/')
    .post(
        authorization.requireAuth.bind(authorization),
        upload.single("image"),
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().GALLERY_UPLOAD_IMAGE_)
        ),
        controller.save.bind(controller)
    )

router
    .route('/')
    .get(
        validator.validateRequest.bind(
            new Validator().init(new RequestValidator().GALLERY_VIEW)
        ),
        controller.list.bind(controller)
    )

module.exports = router