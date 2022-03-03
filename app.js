const express = require('express')
const cors = require('cors')
require('dotenv').config()
const router = require('./routes')
const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/bookmarks', router)

app.listen(port, () => {
  console.log(`App islisten on port ${port}`)
})
