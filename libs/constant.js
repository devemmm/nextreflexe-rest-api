class Constant {
  static responses = {
    SUCCESS: { CODE: 200, MSG: "Success" },
    HEADER: {
      AUTHORIZATION: "Authorization",
      CONTENT_TYPE: "application/json",
      MULTIPART_CONTENT_TYPE: "multipart/form-data",
      TIMEOUT: 120000,
    },
    ERROR: {
      MSG: "error",
      INVALID_RESPONSE: "INVALID_RESPONSE",
    },
    BAD_REQUEST: { CODE: 400, MSG: "Bad Request" },
    RESOURCE_ALREADY_EXISTS: { CODE: 409, MSG: "Resource Already Exists" },
    MOVED_PERMANENTLY: { CODE: 301, MSG: "Moved Permanently" },
    UNAUTHORIZED_REQUEST: { CODE: 401, MSG: "Unauthorized Request" },
    FORBIDDEN_REQUEST: { CODE: 403, MSG: "Forbidden Request" },
    RESOURCE_NOT_FOUND: { CODE: 404, MSG: "Resource Not Found" },
    INVALID_PAYLOAD: { CODE: 422, MSG: "Invalid Input Payload" },
    INTERNAL_SERVER_ERROR: { CODE: 500, MSG: "Internal Server Error" },
    VLSM_URL: "https://rwd.labsinformatics.com/api/v1.1",
  };

  static user = {
    PASSWORD: "User123",
  };

  static MOMENT_TIME_FOMART = "YYYY-MM-DD HH:mm:ss";

  static PAYMENT = {
    STATUS: {
      PAY: "PAY",
      BEFORE: "BEFORE",
      AFTER: "AFTER",
    },
    METHOD: {
      MOMO: "MOMO",
      BK: "BK",
      HANDS: "HANDS",
      EQUITY: "EQUITY",
      SPENN: "SPENN",
    },
    ERROR: {
      UNPAID: "please pay",
      SESSION: "please specify total session",
    },
  };

  static BRANCH = {
    MIN: [
      {
        id: "RW01",
        price: 150000,
      },
    ],
  };

  static PRIVILAGES = {
    USER: {
      VALUE: 'USER',
      description: '',
      role: ''
    },
    ADMIN: {
      VALUE: 'ADMIN',
      description: '',
      role: ''
    },
    SUPER_ADMIN: {
      VALUE: 'SUPER_ADMIN',
      description: '',
      role: ''
    },
    PATIENT: {
      VALUE: 'PATIENT',
      description: '',
      role: ''
    },
    THERAPIST: {
      VALUE: 'THERAPIST',
      description: '',
      role: ''
    },
  }
}

module.exports = Constant;
