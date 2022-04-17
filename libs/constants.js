module.exports = {
    HEADER: {
      TOKEN: 'x-auth-token',
      CONTENT_TYPE: 'application/json',
      REFRESH_TOKEN: 'refresh_token',
      TIMEOUT: 30000
    },
    ERROR: {
      CODE: 500,
      MSG: 'error'
    },
    SUCCESS: {
      CODE: 200,
      MSG: 'ok'
    },
    STATUS: {
      ACTIVE: 'ACTIVE',
      INACTIVE: 'INACTIVE',
      DELETED: 'DELETED',
      VERIFIED: 'VERIFIED',
      UN_VERIFIED: 'UN_VERIFIED',
      EXPIRED: 'EXPIRED',
      IN_REVIEW: 'IN_REVIEW',
      PENDING: 'PENDING',
      SUCCESS: 'SUCCESS'
    },
    MSG: {
      TRY_AGAIN: 'please try again later',
      NO_RECORD: 'no record(s) found',
      HAS_RECORD: 'record(s) found',
      CREATE: 'created successfully',
      UPDATE: 'updated successfully',
      DELETE: 'deleted successfully',
      BAD_REQUEST: 'bad request',
      UNAUTHORIZED: 'unauthorized access. content-type or auth-token invalid',
      ACCESS_DENIED: 'access denied'
    },
    ROLES: {
      ADMIN: 'ADMIN',
      USER: 'USER',
      NOTIFIER: 'NOTIFIER',
      CR: 'CR',
      MINISTRY_ADMIN: 'MINISTRY_ADMIN',
      SECONDARY_ADMIN: 'SECONDARY_ADMIN',
      SUPER_ADMIN: 'SUPER_ADMIN',
      LAUNCHER: 'LAUNCHER'
    },
    METHODS: {
      POST: 'post',
      GET: 'get',
      DELETE: 'delete'
    },
    MINISTRY: {
      MOH: 'MOH',
      MINALOC: 'MINALOC',
      MINAFFET: 'MINAFFET'
    },
    NURSE_ATTENDANTS: {
      EXPIRY_DAYS: 30
    },
    URLS: {
      NOTIFICATION: `${process.env.NOTIFICATION_URL}/api/v1/notifications`,
      USERS_COUNT_URL: `${process.env.USERS_SERVICES}/api/v1/users/active-users-count`,
      SHIFT_USERS_URL: `${process.env.USERS_SERVICES}/api/v1/users/handle-facility-users`,
      BIRTH_COUNT_URL: `${process.env.BIRTH_DEATH_SERVICES}/api/v1/birth/registered-count`,
      SHIFT_BIRTHS_URL: `${process.env.BIRTH_DEATH_SERVICES}/api/v1/birth/handle-hf-records`,
      DEATH_COUNT_URL: `${process.env.BIRTH_DEATH_SERVICES}/api/v1/death/registered-count`,
      SHIFT_DEATHS_URL: `${process.env.BIRTH_DEATH_SERVICES}/api/v1/death/handle-hf-records`
    }
  }