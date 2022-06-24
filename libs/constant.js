class Constant {
  static responses = {
    HEADER: {
      AUTHORIZATION: "Authorization",
      CONTENT_TYPE: "application/json",
      MULTIPART_CONTENT_TYPE: "multipart/form-data",
      TIMEOUT: 120000,
    },
    SUCCESS: { CODE: 200, MSG: "Success" },
    CREATED: { CODE: 201, MSG: "Resources has been created" },
    DELETED: { CODE: 204, MSG: "Resource deleted successfully" },
    INVALID_RESPONSE: { CODE: 204, MSG: "INVALID_RESPONSE" },
    ERROR: { CODE: 500, MSG: "Internal Server Error" },
    BAD_REQUEST: { CODE: 400, MSG: "Bad Request" },
    RESOURCE_ALREADY_EXISTS: { CODE: 409, MSG: "Resource Already Exists" },
    MOVED_PERMANENTLY: { CODE: 301, MSG: "Moved Permanently" },
    UNAUTHORIZED_REQUEST: { CODE: 401, MSG: "Unauthorized Request" },
    FORBIDDEN_REQUEST: { CODE: 403, MSG: "Forbidden Request" },
    RESOURCE_NOT_FOUND: { CODE: 404, MSG: "Resource Not Found" },
    INVALID_PAYLOAD: { CODE: 422, MSG: "Invalid Input Payload" },
    INTERNAL_SERVER_ERROR: { CODE: 500, MSG: "Internal Server Error" }
  };

  static user = { PASSWORD: "User123" };
  static MOMENT_TIME_FOMART = "YYYY-MM-DD HH:mm:ss";

  static PAYMENT = {
    STATUS: { PAY: "PAY", BEFORE: "BEFORE", AFTER: "AFTER" },
    METHOD: { MOMO: "MOMO", BK: "BK", HANDS: "HANDS", EQUITY: "EQUITY", SPENN: "SPENN" },
    ERROR: { UNPAID: "please pay", SESSION: "please specify total session" },
  };

  static BRANCH = { MIN: [{ id: "RW01", price: 150000 }] };

  static PRIVILAGES = {
    USER: { VALUE: 'USER', description: '', role: '' },
    ADMIN: { VALUE: 'ADMIN', description: '', role: '' },
    SUPER_ADMIN: { VALUE: 'SUPER_ADMIN', description: '', role: '' },
    PATIENT: { VALUE: 'PATIENT', description: '', role: '' },
    THERAPIST: { VALUE: 'THERAPIST', description: '', role: '' },
  }

  static AVATAR = "https://png.pngtree.com/png-clipart/20210608/ourlarge/pngtree-light-gray-silhouette-avatar-png-image_3418403.jpg"
  static SERVICE_AVATAR = "https://png.pngtree.com/png-clipart/20210608/ourlarge/pngtree-light-gray-silhouette-avatar-png-image_3418403.jpg"
  static USER_STATUS = ['ACTIVE', 'INACTIVE', 'DELETED']
  static USER_TYPE = ['PATIENT', 'THERAPIST', 'ADMIN', 'SUPER_ADMIN']
  static APPO_VIST_STATUS = ['PENDING', 'SUCCESS', 'FAILED', 'DELETED']
}

module.exports = Constant;
