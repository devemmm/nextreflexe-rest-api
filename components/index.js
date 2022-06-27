const express = require('express')
const fs = require('fs')
const router = express.Router()

// GET /health - Check service health
router.get('/', (req, res) => res.json({ message: 'API server running' }))
router.get('/api/v1/', (req, res) => res.json({ message: 'API server running' }))

fs.readdir(__dirname, function (err, components) {
  if (err) {
    return console.log('Unable to scan directory: ' + err)
  }
  components.forEach(function (component) {
    try {
      if (fs.existsSync(`${__dirname}/${component}/router.js`)) {
        router.use(`${process.env.BASEPATH}/${component}`.toLowerCase(), require(`./${component}/router`))
      }
    } catch (e) {
      console.log('error', e)
    }
  })
})

module.exports = router