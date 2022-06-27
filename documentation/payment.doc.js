const responses = require('./response');

const payment = {
    '/payments': {
        post: {
            tags: ['Payment'],
            summary: 'Directly payment',
            description: 'Directly payment',
            operationId: 'Directly payment',
            consumes: 'application/json',
            produces: 'application/json',
            parameters: [
                {
                    name: "body",
                    in: "body",
                    required: "true",
                    schema: {
                        type: "object",
                        properties: {
                            patientId: {
                                type: "integer"
                            },
                            serviceId: {
                                type: "integer"
                            },
                            sessionPrice: {
                                type: "integer"
                            },
                            pay: {
                                type: "integer"
                            },
                            totalSession: {
                                type: "integer"
                            },
                            paymentMethod: {
                                type: "string"
                            },
                            status: {
                                type: "string"
                            }
                        }
                    }
                }
            ],
            responses,
            security: [
                {
                    JWT: []
                }
            ]
        },
        get: {
            tags: ['Payment'],
            summary: 'get all payment',
            description: 'get all payment',
            operationId: 'get all payment',
            produces: ['application/json'],
            responses,
            security: [
                {
                    JWT: []
                }
            ]
        }
    },
    '/payments/': {
        post: {
            tags: ['Payment'],
            summary: 'Payment made before',
            description: 'Payment made before',
            operationId: 'Payment made before',
            produces: ['application/json'],
            parameters: [
                {
                    name: "body",
                    in: "body",
                    required: "true",
                    schema: {
                        type: "object",
                        properties: {
                            patientId: {
                                type: "integer"
                            },
                            serviceId: {
                                type: "integer"
                            },
                            sessionPrice: {
                                type: "integer"
                            },
                            status: {
                                type: "string"
                            }
                        }
                    }
                }
            ],
            responses,
            security: [
                {
                    JWT: []
                }
            ]
        }
    }
};

const paymentDefinitions = {
    Payment: {
        type: "object",
        properties: {
            id: {
                type: "integer"
            },
            name: {
                type: "string"
            },
            description: {
                type: "string"
            },
            status: {
                type: "string"
            },
            createdBy: {
                type: "string"
            },
            createdAt: {
                type: "string"
            },
            updatedAt: {
                type: "string"
            }
        },
        example: {
            id: 1,
            name: "Kunga Therapy",
            description: "Kunga Therapy",
            status: "active",
            createdBy: "Emmanuel",
            createdAt: "2022-04-14T18:21:02.000Z",
            updatedAt: "2022-04-14T18:21:02.000Z"
        }
    }
};


module.exports = { payment, paymentDefinitions }