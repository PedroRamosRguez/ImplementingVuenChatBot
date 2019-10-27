const { Router } = require('express')
const router = Router()

// Status Endpoint
router.get('/chatbot/status', (req, res) => {
  res.send('OK')
})

// Chatbot Endpoint
router.post('/chatbot', (req, res) => {
  const data = req.body
  console.log(data)
  const response = {
    fulfillmentText: 'Your webhook works fine !'
  }
  res.json(response)
})

module.exports = router
