const responses = require('./response');

const service = {
    '/services': {
        post: {
            tags: ['Service'],
            summary: 'create service',
            description: 'Services available',
            operationId: 'Services available',
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
                            name: {
                                type: "string"
                            },
                            avatar: {
                                type: "string"
                            },
                            description: {
                                type: "string"
                            },
                            createdBy: {
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
            tags: ['Service'],
            summary: 'available Service',
            description: 'get all available service',
            operationId: 'get all available service',
            produces: ['application/json'],
            responses
        }
    },
    '/services?id={id}': {
        get: {
            tags: ['Service'],
            summary: 'get service',
            description: 'get single service by id',
            operationId: 'get single service by id',
            produces: ['application/json'],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "Service_id __unique__identifier"
                }
            ],
            responses
        }
    },
    '/services/{id}': {
        patch: {
            tags: ['Service'],
            summary: 'update service',
            description: 'update a single service',
            operationId: 'update a single service',
            produces: ['application/json'],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    type: "integer",
                    description: "Service id",
                    required: "true"
                },
                {
                    name: "body",
                    in: "body",
                    description: "Service info",
                    required: "true",
                    schema: {
                        type: "object",
                        properties: {
                            avatar: {
                                type: "string"
                            },
                            name: {
                                type: "string"
                            },
                            description: {
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
            tags: ['Service'],
            summary: 'delete service',
            description: 'delete service by id',
            operationId: 'delete service by id',
            produces: ['application/json'],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    type: "integer",
                    description: "Service id",
                    required: "true"
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

const serviceDefinitions = {
    Service: {
        type: "object",
        properties: {
            id: {
                "type": "integer"
            },
            name: {
                "type": "string"
            },
            description: {
                "type": "string"
            },
            status: {
                "type": "string"
            },
            createdBy: {
                "type": "string"
            },
            createdAt: {
                "type": "string"
            },
            updatedAt: {
                "type": "string"
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
    },
};


module.exports = { service, serviceDefinitions }