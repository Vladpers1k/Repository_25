const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI || 'mongodb://mongo:27017/mydatabase'

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Підключено до MongoDB'))
  .catch((err) => console.error('❌ Помилка підключення до MongoDB', err))

module.exports = mongoose
