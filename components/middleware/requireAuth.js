const jwt = require('jsonwebtoken')
const Token = require('../tokens/service')
const User = require('../users/service')

class Authorization {

    async requireAuth(req, res, next) {

        const { authorization } = req.headers

        try {
            if (!authorization) {
                throw new Error('authorization token is null')
            }

            const token = authorization.replace('Bearer ', "");

            jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {

                try {
                    if (error) {
                        throw new Error("authorization token is invalid")
                    }

                    const tokenData = await new Token().getUserByToken({ token })

                    if (!tokenData) {
                        throw new Error("authorization token expired please signin again")
                    }

                    const { userId } = tokenData.dataValues

                    const user = await new User().list({ userId })

                    if (!user) {
                        throw new Error('wrong token')
                    }

                    req.user = user
                    req.user.token = token
                    next()
                } catch (error) {
                    res.status(401).json({ error: { statusCode: 401, status: "failed", message: error.message } })
                }
            })

        } catch (error) {
            res.status(401).json({ error: { statusCode: 401, status: "failed", message: error.message } })
        }
    }
}



module.exports = Authorization