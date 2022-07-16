const Schema = require('./schema')
const { errLogger } = require('../../config/logger')
const LocationShema = require('../location/schema')
const _ = require('lodash')
const sequelize = require('../../config/database')
const QueryBuilder = require('../../helpers/queryBuilder')
const Token = require('../tokens/service')
const bcrypt = require('bcrypt')
const { team } = require('./team')
const PatientService = require('../patients/service')
const PatientSchema = require('../patients/schema')
const nodemailer = require("nodemailer");

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
            throw new Error(e.message)
        }
    }

    async contactUs(params) {
        try {
            const { fname, lname, names, email, phone, message } = params
            const output = `
            <p>Genuine Kunga Therapy Custom Message</p>
            <h3>Custom Details</h3>
            <ul>
                <li>Name: ${names}</li>
                <li>Email: ${email}</li>
                <li>Phone: ${phone}</li>
            </ul>
            <h3>Message</h3>
            <p>${message}</p>
        `;

            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });

            // Step 2
            let mailOptions = {
                from: process.env.EMAIL,
                to: `${process.env.TECHNICAL_SUPPORT_EMAIL}`,
                subject: "Genuine Kunga Therapy Custom Message",
                text: "heading",
                html: output
            };

            // Step 3
            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    return res.send({ error: err });
                }
            });
            return { message: "message sent successfull" }
        } catch (e) {
            console.log(e.message)
            errLogger.error(e)
            throw new Error(e.message)
        }
    }

    async list({ req, userId }) {
        try {


            // this case its for middleware validation
            if (userId) {
                const user = await Schema.findByPk(userId)
                return this.hideUserData(user._previousDataValues)
            }
            // --------------------------------------------------------------------

            const { callFunction, query } = await QueryBuilder.USER_LIST(req)
            let data;

            console.log({ query })
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

    async profile({ req }) {
        return req.user;
    }

    async listTeam() {
        return team;
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
            throw new Error(error.message)
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

        try {

            let isPatient = false
            let user;
            user = await Schema.findOne({ where: "email" ? { email: credentials.email } : { phone: credentials.phone } })

            if (!user) {
                user = await PatientSchema.findOne({ where: "email" ? { email: credentials.email } : { phone: credentials.phone } })

                if (!user) {
                    throw new Error("user not found")
                }

                isPatient = true
            }


            user = user._previousDataValues

            const isMatch = await bcrypt.compare(credentials.password, user.password)
            if (!isMatch) {
                throw new Error("wrong pasword")
            }
            return { user, isPatient }
        } catch (error) {
            throw new Error(error.message)
        }
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

            const { user, isPatient } = await this.findByCredentials({ type, credentials: { email, phone, password } })

            const token = await new Token().generateToken({ id: user.id, isPatient })

            return { user: this.hideUserData(user), token }
        } catch (e) {
            throw new Error(e.message)
        }
    }

    async signup(params) {
        try {
            return await new PatientService().save(params)
        } catch (e) {
            errLogger.error(e)
            throw new Error(e.message)
        }
    }

    async signout(params) {
        try {
            return await new Token().deleteToken(params)
        } catch (error) {
            errLogger.error(error)
            throw new Error(error.message)
        }
    }

}

module.exports = Service;