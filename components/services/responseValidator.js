const joi = require('@hapi/joi')

const create = joi.object().keys({
  id: joi.string().required(),
  created: joi.date().required()
})

const list = joi.object().keys({
  results: joi.array().required(),
  count: joi
    .number()
    .integer()
    .required()
})


const read = joi.object().keys()

const update = joi.object().keys({
  id: joi.string().required()
})

module.exports = {
  create,
  list,
  read,
  update
}