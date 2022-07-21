const responses = require('./response');

const appointment = {
    '/appointments': {
        post: {
            tags: ['Appointment'],
            summary: 'make appointment when you have account',
            description: 'create appointment',
            operationId: 'create appointment',
            produces: ['application/json'],
            parameters: [
                {
                    name: "body",
                    in: "body",
                    description: "appointment details",
                    required: "true",
                    schema: {
                        type: "object",
                        properties: {
                            startTime: {
                                type: "string"
                            },
                            branchId: {
                                type: "string"
                            },
                            patientId: {
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
        },
        get: {
            tags: ['Appointment'],
            summary: 'list of appointments',
            description: 'get all appointments',
            operationId: 'get all appointments',
            produces: ['application/json'],
            responses,
            security: [
                {
                    JWT: []
                }
            ]
        }
    },
    '/appointments/unknown?account=false': {
        post: {
            tags: ['Appointment'],
            summary: 'make appointment for unknow user',
            description: 'create appointment',
            operationId: 'create appointment for unknow',
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
        }
    },
    '/appointments?id={id}': {
        get: {
            tags: ['Appointment'],
            summary: 'get single appointment with id',
            description: 'get single appointment with id',
            operationId: 'get single appointment with id',
            produces: ['application/json'],
            parameters: [
                {
                    name: "id",
                    in: "query",
                    required: true,
                    description: "appointment_id __unique__identifier"
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
    '/appointments?patientId={patientId}&status=success': {
        get: {
            tags: ['Appointment'],
            summary: 'get single success appointment with id',
            description: 'get single success appointment with id',
            operationId: 'get single success appointment with id',
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
    '/appointments?patientId={patientId}&status=failed': {
        get: {
            tags: ['Appointment'],
            summary: 'get single failed appointment with id',
            description: 'get single failed appointment with id',
            operationId: 'get single failed appointment with id',
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
    '/appointments?patientId={patientId}&status=pending': {
        get: {
            tags: ['Appointment'],
            summary: 'get single pending appointment with id',
            description: 'get single pending appointment with id',
            operationId: 'get single pending appointment with id',
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
    '/appointments?patientId={patientId}': {
        get: {
            tags: ['Appointment'],
            summary: 'all appointment for patient',
            description: 'all appointment for patient',
            operationId: 'all appointment for patient',
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
    '/appointments/{id}': {
        patch: {
            tags: ['Appointment'],
            summary: 'update appointment status',
            description: 'update appointment status',
            operationId: 'update appointment status',
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
                        propertie: {
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
            tags: ['Appointment'],
            summary: 'Delete appointment of a Patient',
            description: 'Delete appointment of a Patient',
            operationId: 'Delete appointment of a Patient',
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
};

const appointmentDefinitions = {
    Appointment: {
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
            id: 3,
            startTime: "2022-04-20 15:30:00",
            endTime: "2022-04-20 17:00:00",
            status: "PENDING",
            createdAt: "2022-04-17T18:12:52.000Z",
            updatedAt: "2022-04-17T18:12:52.000Z",
            patientId: 12,
            branchId: "RW01",
            doctorId: "RWB101",
            userId: "RWB101"
        }
    },
};


module.exports = { appointment, appointmentDefinitions }