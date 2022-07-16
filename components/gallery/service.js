const Schema = require('./schema')
const { errLogger } = require('../../config/logger')
const QueryBuilder = require('../../helpers/queryBuilder')
const { cloudinary } = require('../../config/cloudnary')

class Service {
    async save(req) {
        try {
            const fileStr = req.file.path;
            const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'ml_default'
            })
            req.body.image = uploadedResponse.secure_url
            req.body.thumbnail = uploadedResponse.secure_url
            const picture = await new Schema(req.body)
            return await picture.save();
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }

    async list(req) {
        try {

            const { callFunction, query } = await QueryBuilder.GALLERY(req, true)
            let data;

            switch (callFunction) {
                case 'findOne':
                    data = await Schema.findOne(query)
                    break;
                default:
                    data = await Schema.findAndCountAll(query)
            }

            return data;
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }

    async update(req) {
        return []
    }

    async delete(req) {
        return []
    }
}

module.exports = Service;