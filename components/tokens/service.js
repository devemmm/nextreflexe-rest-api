const Schema = require('./schema')
const _ = require('lodash')
const jwt = require('jsonwebtoken')


class Service {
    async generateToken({ id, isPatient }) {
        try {

            if (!id) {
                throw "unique identifier of user required"
            }

            const tokenKey = jwt.sign({ id }, process.env.JWT_SECRET)

            const bindData = {
                token: tokenKey,
                userId: id,
            }

            if (isPatient) {
                delete bindData.userId
                bindData.patientId = id;
            }
            const token = new Schema(bindData)
            await token.save()

            return token.token;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getUserByToken({ token }) {
        return await Schema.findOne({ where: { token } })
    }
}

module.exports = Service;