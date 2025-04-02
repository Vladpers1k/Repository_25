const express = require('express')
const Assignment = require('./models/Assignment')
const router = express.Router()

router.post('/assignments/seed', async (req, res) => {
  try {
    const assignments = [
      { name: 'Іван', subject: 'Математика', score: 78 },
      { name: 'Марія', subject: 'Фізика', score: 85 },
      { name: 'Петро', subject: 'Хімія', score: 90 },
      { name: 'Оксана', subject: 'Математика', score: 88 },
      { name: 'Андрій', subject: 'Фізика', score: 82 }
    ]
    await Assignment.insertMany(assignments)
    res.status(201).json({ message: 'Дані успішно додано!' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/assignments/high-scores', async (req, res) => {
  try {
    const highScores = await Assignment.find({ score: { $gt: 80 } })
    res.json(highScores)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.patch('/assignments/update-score', async (req, res) => {
  try {
    const assignment = await Assignment.findOne({ score: { $lt: 85 } })
    if (assignment) {
      assignment.score += 5
      await assignment.save()
    }
    res.json({ message: 'Оцінка оновлена', updatedAssignment: assignment })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/assignments/delete-lowest', async (req, res) => {
  try {
    const lowest = await Assignment.findOne().sort({ score: 1 })
    if (lowest) {
      await Assignment.deleteOne({ _id: lowest._id })
    }
    res.json({ message: 'Найгірший результат видалено', deleted: lowest })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/assignments/projection', async (req, res) => {
  try {
    const assignments = await Assignment.find({}, { _id: 0, name: 1, score: 1 })
    res.json(assignments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/assignments/average-score', async (req, res) => {
  try {
    const result = await Assignment.aggregate([
      { $group: { _id: '$subject', averageScore: { $avg: '$score' } } },
      { $match: { averageScore: { $gt: 75 } } }
    ])
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
