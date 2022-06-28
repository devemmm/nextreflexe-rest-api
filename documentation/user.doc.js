const responses = require('./response');

const user = {
    '/users/signin': {
        post: {
            tags: ["User"],
            summary: "sigin",
            description: "signin",
            operationId: 'Signin',
            consumes: 'application/json',
            produces: 'application/json',
            parameters: [
                {
                    name: "Login",
                    in: "body",
                    description: "Login",
                    required: true,
                    schema: {
                        type: "object",
                        properties: {
                            email: {
                                type: "string"
                            },
                            password: {
                                type: "string"
                            }
                        }
                    }
                }
            ],
            responses
        }
    },
    '/users': {
        post: {
            tags: ['User'],
            summary: 'Signup',
            description: 'Signup',
            operationId: 'Signup',
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
                            password: {
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
            responses
        },
        get: {
            tags: ['User'],
            summary: 'list of users --route for system admin',
            description: 'list of users',
            operationId: 'list of users',
            produces: ['application/json'],
            responses,
            security: [
                {
                    JWT: []
                }
            ]
        }
    },
    '/users/team': {
        get: {
            tags: ['User'],
            summary: 'get my profile',
            description: 'get my profile',
            operationId: 'get my profile',
            produces: ['application/json'],
            responses
        },
    },
    '/users/me': {
        patch: {
            tags: ['User'],
            summary: 'get my profile',
            description: 'get my profile',
            operationId: 'get my profile',
            produces: ['application/json'],
            responses,
            security: [
                {
                    JWT: []
                }
            ]
        },
    },
    '/users?userId={userId}': {
        patch: {
            tags: ['User'],
            summary: 'single user info --route for system admin',
            description: 'single user info --route for system admin',
            operationId: 'single user info --route for system admin',
            produces: ['application/json'],
            parameters: [
                {
                    name: "Authorization",
                    in: "header",
                    description: "Authorization"
                },
                {
                    name: "id",
                    in: "path",
                    required: "true"
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


    // '/users/{id}': {
    //     patch: {
    //         tags: ['Branch'],
    //         summary: 'single user info --route for system admin',
    //         description: 'list of users',
    //         operationId: 'list of users',
    //         produces: ['application/json'],
    //         parameters: [
    //             {
    //                 name: "id",
    //                 in: "path"
    //             },
    //             {
    //                 name: "body",
    //                 in: "body",
    //                 description: "Service info",
    //                 required: "true",
    //                 schema: {
    //                     type: "object",
    //                     properties: {
    //                         id: {
    //                             type: "string"
    //                         },
    //                         name: {
    //                             type: "string"
    //                         },
    //                         managerId: {
    //                             type: "string"
    //                         },
    //                         location: {
    //                             required: true,
    //                             type: "object",
    //                             properties: {
    //                                 country: {
    //                                     type: "string"
    //                                 },
    //                                 province: {
    //                                     type: "string"
    //                                 },
    //                                 district: {
    //                                     type: "string"
    //                                 },
    //                                 sector: {
    //                                     type: "string"
    //                                 },
    //                                 cell: {
    //                                     type: "string"
    //                                 },
    //                                 village: {
    //                                     type: "string"
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         ],
    //         responses,
    //         security: [
    //             {
    //                 JWT: []
    //             }
    //         ]
    //     },
    //     delete: {
    //         tags: ['Branch'],
    //         summary: 'delete branch',
    //         description: 'delete branch bu useing branch id',
    //         operationId: 'delete branch',
    //         produces: ['application/json'],
    //         parameters: [

    //             {
    //                 name: "id",
    //                 required: true,
    //                 in: "path",
    //                 description: "branch_id __unique__identifier"
    //             }
    //         ],
    //         responses,
    //         security: [
    //             {
    //                 JWT: []
    //             }
    //         ]
    //     }
    // },
};

const userDefinitions = {
    User: {
        type: "object",
        properties: {
            id: {
                type: "integer"
            },
            fname: {
                type: "string"
            },
            lname: {
                type: "string"
            },
            nid: {
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
            user_createdAt: {
                type: "string"
            },
            user_updatedAt: {
                type: "string"
            },
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
            location_createdAt: {
                type: "string"
            },
            location_updatedAt: {
                type: "string"
            }
        },
        example: {
            id: "RWB102",
            fname: "Emmanuel",
            lname: "NTIVUGURUZWA",
            nid: "1199887777889",
            email: "primaryemmyy@gmail.com",
            phone: "0788596841",
            dob: "1-1-1998",
            user_createdAt: "2022-04-17T17:03:59.000Z",
            user_updatedAt: "2022-04-17T17:03:59.000Z",
            country: "RWANDA",
            province: "KIGALI",
            district: "GASABO",
            sector: "REMERA",
            cell: "RUKIRI II",
            village: "REBERO",
            location_createdAt: "2022-04-17T15:03:59.000Z",
            location_updatedAt: "2022-04-17T15:03:59.000Z"
        }
    }
};


module.exports = { user, userDefinitions }