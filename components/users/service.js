const Schema = require('./schema')
const { errLogger } = require('../../config/logger')
const LocationShema = require('../location/schema')
const _ = require('lodash')
const sequelize = require('../../config/database')
const QueryBuilder = require('../../helpers/queryBuilder')
const Token = require('../tokens/service')
const bcrypt = require('bcrypt')

class Service {
    async save(params) {
        try {

            params.password = await bcrypt.hash(params.password, 8)

            const user = new Schema(params)
            await user.save()

            const location = new LocationShema({ ...params.location, userId: user.id })

            await location.save()
            return user
        } catch (e) {
            console.log(e.message)
            errLogger.error(e)
        }
    }

    async list({ req, userId }) {
        try {

            // // this case its for middleware validation
            // if (userId) {
            //     const user = await Schema.findByPk(userId)
            //     return this.hideUserData(user._previousDataValues)
            // }
            // // --------------------------------------------------------------------

            // const { callFunction, query } = await QueryBuilder.USER_LIST(req)
            // let data;

            // console.log({ query })
            // switch (callFunction) {
            //     case 'findOne':
            //         data = await Schema.findOne(query)
            //         break;
            //     default:
            //         data = await Schema.findAndCountAll(query)
            // }
            // console.log("---------------------------------")
            // return data


            const user = Schema.findOne({ where: { id: 'RWB101' }, include: [{ model: sequelize.modelManager.getModel("location") }] })

            return user
        } catch (e) {
            errLogger.error(e)
        }
    }


    async update(params) {
        try {

            const query = "UPDATE branch_location SET createdBy='Emmanuell' where branchId='RW01';"
            const [results, metadata] = await sequelize.query(query);

            if (metadata.affectedRows > 0 && metadata.changedRows > 0) {
                return { resullt: 'branch_updated_successfull' }
            }

            return { resullt: 'something_went_wrong' };
        } catch (error) {
            errLogger.error(e)
        }
    }

    async delete(params) {
        try {
            return { data: [] }
        } catch (error) {
            errLogger.error(e)
        }
    }


    async findByCredentials({ type, credentials }) {

        let user = await Schema.findOne({ where: "email" ? { email: credentials.email } : { phone: credentials.phone } })

        if (!user) {
            throw new Error("user not found")
        }
        user = user._previousDataValues

        const isMatch = await bcrypt.compare(credentials.password, user.password)
        if (!isMatch) {
            throw new Error("wrong pasword")
        }
        return user
    }

    hideUserData(user) {
        delete user.password;
        return user;
    }

    async signin(req, res) {
        try {
            const { email, phone, password } = req.body;

            let type = 'email';
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            email.match(regexEmail) ? type = "email" : type = "phone"

            const user = await this.findByCredentials({ type, credentials: { email, phone, password } })
            const token = await new Token().generateToken(user.id)

            return { user: this.hideUserData(user), token }
        } catch (e) {
            throw new Error(e.message)
        }
    }

    async signup(credentials) {

    }
}

module.exports = Service;