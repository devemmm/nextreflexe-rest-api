const Schema = require('./schema')
const _ = require('lodash')
const jwt = require('jsonwebtoken')


class Service {
    async generateToken(id) {
        try {

            if (!id) {
                throw "unique identifier of user required"
            }

            console.log(id)
            const tokenKey = jwt.sign({ id }, process.env.JWT_SECRET)

            const token = new Schema({
                token: tokenKey,
                userId: id,
            })
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