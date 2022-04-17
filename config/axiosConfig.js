const axios = require('axios')
const { HEADER } = require('../libs/constants')

const API = axios.create({
  headers: {
    'Content-Type': HEADER.CONTENT_TYPE
  },
  timeout: HEADER.TIMEOUT
})

API.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

module.exports = API