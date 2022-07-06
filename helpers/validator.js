const joi = require("@hapi/joi");

class Validator {
  CREATE_SERVICE = joi.object().keys({
    name: joi.string().required(),
    description: joi.string().required(),
    status: joi.string().valid("ACTIVE", "INACTIVE"),
    createdBy: joi.string().required(),
  });

  LIST_SERVICE = joi.object().keys({
    id: joi.number(),
  });

  UPDATE_SERVICE = joi.object().keys({
    id: joi.number(),
    name: joi.string(),
    description: joi.string().required(),
  });

  DELETE_SERVICE = joi.object().keys({
    id: joi.number().required(),
  });

  CREATE_BRANCH = joi.object().keys({
    id: joi.string().required(),
    name: joi.string().required(),
    managerId: joi.string().required(),
    location: joi
      .object()
      .keys({
        country: joi.string(),
        province: joi.string().required(),
        district: joi.string(),
        sector: joi.string(),
        cell: joi.string(),
        village: joi.string(),
        createdBy: joi.string(),
      })
      .required(),
  });

  LIST_BRANCH = joi.object().keys({
    id: joi.string(),
    name: joi.string(),
    search: joi.string(),
    visit: joi.boolean(),
    appointment: joi.boolean(),
    appointmentStatus: joi.string(),
    visitStatus: joi.string(),
    byLocation: joi.boolean(),
  });

  UPDATE_BRANCH = joi.object().keys({
    id: joi.string(),
    name: joi.string(),
    managerId: joi.string(),
    location: joi.object().keys({
      country: joi.string(),
      province: joi.string(),
      district: joi.string(),
      sector: joi.string(),
      cell: joi.string(),
      village: joi.string(),
      createdBy: joi.string(),
    }),
  });

  DELETE_BRANCH = joi.object().keys({
    id: joi.string().required(),
  });

  //--------------APPOINTMENT----------------

  CREATE_APPOINTMENT = joi.object().keys({
    account: joi.string(),
    fname: joi.string(),
    lname: joi.string(),
    email: joi.string(),
    phone: joi.string(),
    dob: joi.string(),
    nid: joi.string(),
    location: joi.object().keys({
      country: joi.string(),
      province: joi.string(),
      district: joi.string(),
      sector: joi.string(),
      cell: joi.string(),
      village: joi.string(),
      createdBy: joi.string(),
    }),
    startTime: joi.string().required(),
    endTime: joi.string(),
    branchId: joi.string().required(),
    patientId: joi.number(),
    userId: joi.string(),
    serviceId: joi.number()
  });

  LIST_APPOINTMEENT = joi.object().keys({
    id: joi.number(),
    patientId: joi.number(),
    status: joi.string(),
    serviceId: joi.number()
  });

  UPDATE_APPOINTMENT = joi.object().keys({
    id: joi.number(),
    startTime: joi.string(),
    endTime: joi.string(),
    brachId: joi.string(),
    patientId: joi.string(),
    userId: joi.string(),
    status: joi.string().valid("PENDING", "SUCCESS", "FAILED"),
    serviceId: joi.number()
  });

  DELETE_APPOINTMEENT = joi.object().keys({
    id: joi.number(),
  });

  // ------------VISIT--------------

  CREATE_VISIT = joi.object().keys({
    appointment: joi.boolean(),
    time: joi.number(),
    appointmentId: joi.number(),
    endTime: joi.string(),
    branchId: joi.string(),
    patientId: joi.number(),
    userId: joi.string(),
    serviceId: joi.number(),
    visitId: joi.number()
  });

  LIST_VISIT = joi.object().keys({
    id: joi.number(),
    appointmentId: joi.number(),
    patientId: joi.number(),
    branchId: joi.string(),
    userId: joi.string(),
    status: joi.string(),
    serviceId: joi.number(),
    visitId: joi.number()
  });

  UPDATE_VISIT = joi.object().keys({
    id: joi.number(),
    startTime: joi.string(),
    endTime: joi.string(),
    brachId: joi.string(),
    patientId: joi.string(),
    userId: joi.string(),
    status: joi.string().valid("PENDING", "SUCCESS", "FAILED").required(),
    serviceId: joi.number(),
    visitId: joi.number()
  });

  DELETE_VISIT = joi.object().keys({
    id: joi.number(),
  });

  SIGNUP = joi.object().keys({
    fname: joi.string().required(),
    lname: joi.string().required(),
    nid: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi
      .string()
      .regex(/^\d{3}\d{3}\d{4}$/)
      .required(),
    dob: joi.string().required(),
    password: joi.string().required(),
    location: joi
      .object()
      .keys({
        country: joi.string(),
        province: joi.string(),
        district: joi.string(),
        sector: joi.string(),
        cell: joi.string(),
        village: joi.string(),
      })
      .required(),
  });

  CREATE_USER = joi.object().keys({
    id: joi.string().required(),
    fname: joi.string().required(),
    lname: joi.string().required(),
    nid: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi
      .string()
      .regex(/^\d{3}\d{3}\d{4}$/)
      .required(),
    dob: joi.string().required(),
    password: joi.string().required(),
    location: joi
      .object()
      .keys({
        country: joi.string(),
        province: joi.string(),
        district: joi.string(),
        sector: joi.string(),
        cell: joi.string(),
        village: joi.string(),
      })
      .required(),
  });

  LIST_USER = joi.object().keys({
    id: joi.string(),
  });

  SIGNIN = joi.object().keys({
    phone: joi.string(),
    email: joi.string(),
    password: joi.string()
  })

  UPDATE_USER = joi.object().keys({
    id: joi.number(),
  });

  DELETE_USER = joi.object().keys({
    id: joi.number(),
  });

  // ------------PATIENT-------------

  CREATE_PATIENT = joi.object().keys({
    fname: joi.string().required(),
    lname: joi.string().required(),
    nid: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi
      .string()
      .regex(/^\d{3}\d{3}\d{4}$/)
      .required(),
    dob: joi.string().required(),
    password: joi.string().required(),
    location: joi
      .object()
      .keys({
        country: joi.string(),
        province: joi.string(),
        district: joi.string(),
        sector: joi.string(),
        cell: joi.string(),
        village: joi.string(),
      })
      .required(),
  });

  LIST_PATIENT = joi.object().keys({
    id: joi.string(),
  });

  UPDATE_PATIENT = joi.object().keys({
    id: joi.number(),
  });

  DELETE_PATIENT = joi.object().keys({
    id: joi.number(),
  });

  // ---------------PAYMENT-----------------------

  CREATE_PAYMENT = joi.object().keys({
    patientId: joi.number().required(),
    visitId: joi.number().required(),
    serviceId: joi.number().required(),
    sessionPrice: joi.number(),
    pay: joi.number(),
    totalPayment: joi.number(),
    totalSession: joi.number(),
    paymentMethod: joi.string(),
    status: joi.string(),
    insufficient: joi.boolean()
  });

  LIST_PAYMENT = joi.object().keys({
    id: joi.string(),
    visitId: joi.number(),
    patientId: joi.number(),
    sessionPrice: joi.number(),
    insufficient: joi.boolean()
  });

  UPDATE_PAYMENT = joi.object().keys({
    id: joi.number(),
    visitId: joi.number().required(),
    serviceId: joi.number().required(),
    sessionPrice: joi.number(),
    pay: joi.number(),
  });

  DELETE_PAYMENT = joi.object().keys({
    id: joi.number(),
  });
}

module.exports = Validator;
