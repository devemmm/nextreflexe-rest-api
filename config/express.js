require('../config/database')
const express = require('express')
const app = express()
const { serve, setup } = require("swagger-ui-express");
const docs = require('../documentation/index')
const cors = require('cors')
const api = require('../components')
const { logger } = require('./logger')
const morgan = require('morgan')
const _ = require('lodash')

app.set('trust proxy', true)
app.use(
  cors({
    origin: '*'
  })
);

morgan.token('ip', req => {
  let reqIp
  if (_.has(req, 'headers') && _.has(req.headers, 'x-client-ip')) {
    reqIp = req.headers['x-client-ip']
  } else {
    reqIp = req.ip ? req.ip : ''
  }
  return reqIp
})


app.use(cors());
app.use(
  morgan(
    ':ip - [:date[iso]] ":method :url HTTP/:http-version" ' +
    ':status :res[content-length] ":referrer" ":user-agent"',
    { stream: logger.stream }
  )
)

app.use(express.json())
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use('/', api)
app.use("/api-docs", serve, setup(docs))


// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(400).json({
    status: 'error',
    message: 'requested source not found'
  })
})


module.exports = app
