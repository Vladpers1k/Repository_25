require('dotenv').config()
const express = require('express')
const mongoose = require('./db')
const routes = require('./routes')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api', routes)

app.get('/', (req, res) => {
  res.send('Сервер працює у Docker!')
})

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`)
})
