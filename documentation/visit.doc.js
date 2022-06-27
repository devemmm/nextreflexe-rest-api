const responses = require('./response');

const visit = {
    '/visits': {
        post: {
            tags: ['Visit'],
            summary: "start visit visit for patient who have appointment",
            description: "start visit visit for patient who have appointment",
            operationId: "start visit visit for patient who have appointment",
            produces: ['application/json'],
            parameters: [
                {
                    name: "body",
                    in: "body",
                    required: "true",
                    schema: {
                        type: "object",
                        properties: {
                            appointmentId: {
                                type: "integer"
                            },
                            doctorId: {
                                type: "string"
                            },
                            time: {
                                type: "integer"
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
            tags: ['Visit'],
            summary: 'list of visit',
            description: 'list vist',
            operationId: 'list vist',
            produces: ['application/json'],
            responses,
            security: [
                {
                    JWT: []
                }
            ]
        }
    },
    '/visits?': {
        post: {
            tags: ['Visit'],
            summary: 'make appointment for unknow user',
            description: 'create appointment',
            operationId: 'create appointment',
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
                            doctorId: {
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
    '/visits?id={id}': {
        get: {
            tags: ['Visit'],
            summary: 'find vist by id',
            description: 'find vist by id',
            operationId: 'find vist by id',
            produces: ['application/json'],
            parameters: [
                {
                    name: "id",
                    in: "query"
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
    '/visits?patientId={id}': {
        get: {
            tags: ['Visit'],
            summary: 'find vist by patient_id',
            description: 'find vist by patient_id',
            operationId: 'find vist by id',
            produces: ['application/json'],
            parameters: [
                {
                    name: "patientId",
                    in: "query"
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
    '/visits?patientId={patientId}&status=success': {
        get: {
            tags: ['Visit'],
            summary: 'single success visit visit_id',
            description: 'single success visit with visit_id',
            operationId: 'single success visit with visit_id',
            produces: ['application/json'],
            parameters: [
                {
                    name: "patientId",
                    in: "query",
                    required: true,
                    description: "patient_id __unique__identifier"
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
    '/visits?patientId={patientId}&status=failed': {
        get: {
            tags: ['Visit'],
            summary: 'single failed visit visit_id',
            description: 'single failed visit visit_id',
            operationId: 'single failed vist visit_id',
            produces: ['application/json'],
            parameters: [
                {
                    name: "patientId",
                    in: "query",
                    required: true,
                    description: "patient_id __unique__identifier"
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
    '/visits?patientId={patientId}&status=pending': {
        get: {
            tags: ['Visit'],
            summary: 'single pending vist visit_id',
            description: 'single pending visit visit_id',
            operationId: 'single pending visit visit_id',
            produces: ['application/json'],
            parameters: [
                {
                    name: "patientId",
                    in: "query",
                    required: true,
                    description: "patient_id __unique__identifier"
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
    '/visits?status=pending': {
        get: {
            tags: ['Visit'],
            summary: 'list of all pending vist',
            description: 'list of all pending visit ',
            operationId: 'list of all pending visit ',
            produces: ['application/json'],
            responses,
            security: [
                {
                    JWT: []
                }
            ]
        }
    },
    '/visits/{id}': {
        patch: {
            tags: ['Visit'],
            summary: 'update-confirm -visit',
            description: 'update-confirm -visit',
            operationId: 'update-confirm -visit',
            produces: ['application/json'],
            parameters: [
                {
                    name: "id",
                    in: "path"
                },
                {
                    name: "body",
                    in: "body",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
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
        delete: {
            tags: ['Visit'],
            summary: 'Delete vist of a Patient',
            description: 'Delete vist of a Patient',
            operationId: 'Delete vist of a Patient',
            produces: ['application/json'],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    type: "integer",
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
    '/visits?': {
        post: {
            tags: ['Visit'],
            summary: "start visit visit for patient who haven't appointment",
            description: "start visit visit for patient who haven't appointment",
            operationId: "start visit visit for patient who haven't appointment",
            produces: ['application/json'],
            parameters: [
                {
                    name: "body",
                    in: "body",
                    required: "true",
                    schema: {
                        type: "object",
                        properties: {
                            endTime: {
                                type: "string"
                            },
                            branchId: {
                                type: "string"
                            },
                            patientId: {
                                type: "integer"
                            },
                            doctorId: {
                                type: "integer"
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
    }
};

const visitDefinitions = {
    Visit: {
        type: "object",
        properties: {
            id: {
                type: "integer"
            },
            startTime: {
                type: "string"
            },
            endTime: {
                type: "string"
            },
            status: {
                type: "string"
            },
            createdAt: {
                type: "string"
            },
            updatedAt: {
                type: "string"
            },
            appointmentId: {
                type: "integer"
            },
            patientId: {
                type: "integer"
            },
            branchId: {
                type: "string"
            },
            doctorId: {
                type: "string"
            },
            userId: {
                type: "string"
            }
        },
        example: {
            id: 1,
            startTime: "2022-04-24 16:54:12",
            endTime: "2022-04-24 17:24:12",
            status: "PENDING",
            createdAt: "2022-04-24T12:54:12.000Z",
            updatedAt: "2022-04-24T12:54:12.000Z",
            appointmentId: 4,
            patientId: 12,
            branchId: "RW01",
            doctorId: "RWB101",
            userId: "RWB101"
        }
    },
};


module.exports = { visit, visitDefinitions }