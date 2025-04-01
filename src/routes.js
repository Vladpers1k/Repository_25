const express = require('express')
const router = express.Router()

router.get('/hello', (req, res) => {
  res.json({ message: 'Привіт з Docker!' })
})

module.exports = router
