const responses = require('./response');

const patient = {
    '/patients': {
        post: {
            tags: ['Patient'],
            summary: 'register new patient',
            description: 'this route it will create a new patient with appointment',
            operationId: 'this route it will create a new patient with appointment',
            consumes: 'application/json',
            produces: 'application/json',
            parameters: [
                {
                    name: "body",
                    in: "body",
                    description: "appointment details",
                    required: "true",
                    schema: {
                        type: "object",
                        properties: {
                            fname: {
                                type: "string"
                            },
                            lname: {
                                type: "string"
                            },
                            email: {
                                type: "string"
                            },
                            phone: {
                                type: "string"
                            },
                            dob: {
                                type: "string"
                            },
                            nid: {
                                type: "string"
                            },
                            location: {
                                required: true,
                                type: "object",
                                properties: {
                                    country: {
                                        type: "string"
                                    },
                                    province: {
                                        type: "string"
                                    },
                                    district: {
                                        type: "string"
                                    },
                                    sector: {
                                        type: "string"
                                    },
                                    cell: {
                                        type: "string"
                                    },
                                    village: {
                                        type: "string"
                                    }
                                }
                            },
                            startTime: {
                                "type": "string"
                            },
                            branchId: {
                                type: "string"
                            },
                            userId: {
                                type: "string"
                            }
                        }
                    }
                }
            ],
            responses
        },
        get: {
            tags: ['Patient'],
            summary: 'list of patient',
            description: 'list of patient',
            operationId: 'list of patient',
            produces: ['application/json'],
            responses,
            security: [
                {
                    JWT: []
                }
            ]
        }
    }
};

const patientDefinitions = {
    Patient: {
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


module.exports = { patient, patientDefinitions }