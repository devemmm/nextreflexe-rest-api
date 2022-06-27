const responses = require('./response');

const branch = {
    "/": {
        get: {
            summary: "index",
            description: "api status",
            operationId: "getHome",
            consumes: 'application/json',
            produces: 'application/json',
            responses
        }
    },
    '/branches': {
        post: {
            tags: ['Branch'],
            summary: 'create a new Branch',
            description: 'create a new branch',
            operationId: 'create a new Branch',
            consumes: 'application/json',
            produces: 'application/json',
            parameters: [
                {
                    name: "body",
                    in: "body",
                    description: "Service info",
                    required: "true",
                    schema: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string"
                            },
                            name: {
                                type: "string"
                            },
                            managerId: {
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
            tags: ['Branch'],
            summary: 'get all branch list',
            description: 'get a list of all branch',
            operationId: 'get a list of all branch',
            produces: ['application/json'],
            responses
        }
    },

    '/branches?visit={visit}&appointment={appointment}': {
        get: {
            tags: ['Branch'],
            summary: 'branch list including ...',
            description: 'get a list of all branch including the appointment, visit, etc',
            operationId: 'branch list including ...',
            produces: ['application/json'],
            parameters: [
                {
                    name: "visit",
                    required: true,
                    in: "path",
                    type: "boolean",
                    description: "enable to display visit"
                },
                {
                    name: "appointment",
                    required: true,
                    in: "path",
                    type: "boolean",
                    description: "enable to display appointment"
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
    '/branches/{id}': {
        patch: {
            tags: ['Branch'],
            summary: 'update branch info',
            description: 'update branch info',
            operationId: 'update branch info',
            produces: ['application/json'],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "branch_id __unique__identifier"
                },
                {
                    name: "body",
                    in: "body",
                    description: "Service info",
                    required: "true",
                    schema: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string"
                            },
                            name: {
                                type: "string"
                            },
                            managerId: {
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
            tags: ['Branch'],
            summary: 'delete branch',
            description: 'delete branch bu useing branch id',
            operationId: 'delete branch',
            produces: ['application/json'],
            parameters: [

                {
                    name: "id",
                    required: true,
                    in: "path",
                    description: "branch_id __unique__identifier"
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

const branchDefinitions = {
    Branch: {
        type: "object",
        properties: {
            id: {
                type: "string"
            },
            name: {
                type: "string"
            },
            managerId: {
                type: "string"
            },
            location: {
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
                }
            },
            createdAt: {
                type: "string"
            },
            updatedAt: {
                type: "string"
            }
        }
    },
};


module.exports = { branch, branchDefinitions }