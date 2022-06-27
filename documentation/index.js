const { branch, branchDefinitions } = require('./branch.doc')
const { service, serviceDefinitions } = require('./service.doc')
const { appointment, appointmentDefinitions } = require('./appointment.doc')
const { visit, visitDefinitions } = require('./visit.doc')
const { patient, patientDefinitions } = require('./patient.doc')
const { payment, paymentDefinitions } = require('./payment.doc')
const { user, userDefinitions } = require('./user.doc')


const host = process.env.NODE_ENV === 'production'
    ? process.env.BASE_URL.split('https://')[1]
    : process.env.BASE_URL.split('http://')[1];

console.log({ host })

const paths = {
    ...branch,
    ...service,
    ...appointment,
    ...visit,
    ...patient,
    ...payment,
    ...user
};

const definitions = {
    ...branchDefinitions,
    ...serviceDefinitions,
    ...appointmentDefinitions,
    ...appointmentDefinitions,
    ...visitDefinitions,
    ...patientDefinitions,
    ...paymentDefinitions,
    ...userDefinitions
};

const config = {
    swagger: '2.0',
    info: {
        description: 'medical software system',
        version: '2.0.0',
        title: '@nextreflexe_api --version-2',
        contact: {
            name: "devemm",
            email: "emmanuel@gennxttechsol.com"
        }
    },
    host,
    basePath: '/api/v1',
    schemes: ['http', 'https'],
    securityDefinitions: {
        JWT: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    paths,
    definitions
};

module.exports = config