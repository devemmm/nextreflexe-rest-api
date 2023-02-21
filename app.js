require('dotenv-flow').config()
const app = require('./config/express')

app.listen(process.env.PORT, ()=>console.log(`server is running on port ${process.env.PORT}`))

// module.exports = app