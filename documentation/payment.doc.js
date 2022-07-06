const responses = require('./response');

const payment = {
    '/payments': {
        post: {
            tags: ['Payment'],
            summary: 'Directly payment',
            description: 'Directly payment status it should be PAY or AFTER',
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
                            visitId: {
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
    },
    '/payments?': {
        post: {
            tags: ['Payment'],
            summary: 'Payment for INSUFICIENT Founds',
            description: 'Payment for INSUFICIENT founds status must be INSUFFICIENT_FOUND',
            operationId: 'Payment for INSUFICIENT Founds',
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
                            visitId: {
                                type: "integer"
                            },
                            sessionPrice: {
                                type: "integer"
                            },
                            pay: {
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
    },
    'payments?id={id}': {
        get: {
            tags: ['Payment'],
            summary: 'get all payment for single user',
            description: 'get all payment for single user',
            operationId: 'get all payment for single user',
            produces: ['application/json'],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "patientId"
                }
            ],
            responses,
            security: [
                {
                    JWT: []
                }
            ]
        }
    },
    'payments?visitId={id}': {
        get: {
            tags: ['Payment'],
            summary: 'get all payment for single user using visit Id',
            description: 'get all payment for single user  using visit Id',
            operationId: 'get all payment for single user  using visit Id',
            produces: ['application/json'],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "visitId"
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