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
    UNAUTHORIZED_REQUEST: {
      CODE: 401,
      MSG: "You are not Authorized to perform this action",
    },
    FORBIDDEN_REQUEST: { CODE: 403, MSG: "Forbidden Request" },
    RESOURCE_NOT_FOUND: { CODE: 404, MSG: "Resource Not Found" },
    INVALID_PAYLOAD: { CODE: 422, MSG: "Invalid Input Payload" },
    INTERNAL_SERVER_ERROR: { CODE: 500, MSG: "Internal Server Error" },
  };

  static user = { PASSWORD: "User123" };
  static MOMENT_TIME_FOMART = "YYYY-MM-DD HH:mm:ss";

  static PAYMENT = {
    STATUS: {
      PAY: "PAY",
      BEFORE: "BEFORE",
      AFTER: "AFTER",
      INSUFFICIENT_FOUND: "INSUFFICIENT_FOUND",
    },
    METHOD: {
      HANDS: "HANDS",
      MOMO: "MOMO",
      BK: "BK",
      EQUITY: "EQUITY",
      SPENN: "SPENN",
    },
    ERROR: {
      UNPAID: "please pay",
      SESSION: "please specify total session ans session price",
      VISIT: "Please specify the visit id",
      INSUFFICIENT_FOUND: "insufficient funds",
    },
    CONDITION: {
      INITIAL: "INITIAL",
      BEFORE: "BEFORE",
      INSUFFICIENT_FOUND: "INSUFFICIENT_FOUND",
    },
    ENUM: {
      STATUS: ["PAY", "BEFORE", "AFTER", "INSUFFICIENT_FOUND"],
      METHOD: ["HANDS", "MOMO", "BK", "EQUITY", "SPENN"],
    },
    CONSULTATION: {
      ID: 8,
      TIME: 20,
      PRICE: 10000
    },
    OTHER: {
      TIME: 60
    }
  };

  static BRANCH = { MIN: [{ id: "RW01", price: 150000 }] };

  static PRIVILAGES = {
    USER: { VALUE: "USER", description: "", role: "" },
    PATIENT: { VALUE: "PATIENT", description: "", role: "" },
    THERAPIST: { VALUE: "THERAPIST", description: "", role: "" },
    MANAGER: { VALUE: "MANAGER", description: "", role: "" },
    ADMIN: { VALUE: "ADMIN", description: "", role: "" },
    SUPER_ADMIN: { VALUE: "SUPER_ADMIN", description: "", role: "" },
  };

  static AVATAR =
    "https://png.pngtree.com/png-clipart/20210608/ourlarge/pngtree-light-gray-silhouette-avatar-png-image_3418403.jpg";
  static SERVICE_AVATAR =
    "https://png.pngtree.com/png-clipart/20210608/ourlarge/pngtree-light-gray-silhouette-avatar-png-image_3418403.jpg";
  static USER_STATUS = ["ACTIVE", "INACTIVE", "DELETED"];
  static USER_TYPE = ["PATIENT", "THERAPIST", "ADMIN", "SUPER_ADMIN"];
  static APPO_VIST_STATUS = ["PENDING", "SUCCESS", "FAILED", "DELETED"];
  static DEFAULT_ALBUM = "main";
  static REDIRECT = "https://deploy-preview-8--nextreflexe.netlify.app/gallery";
}

module.exports = Constant;
