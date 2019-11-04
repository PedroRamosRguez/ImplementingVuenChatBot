const { Router } = require('express')
const welcomeIntent = require('../server/welcomeIntent')
const fruitIntent = require('../server/fruitsIntent')
const router = Router()

// Status Endpoint
router.get('/chatbot/status', (req, res) => {
  res.send('OK')
})

// Chatbot Endpoint
router.post('/chatbot', (req, res) => {
  const data = req.body
  const actions = {
    'welcome': welcomeIntent.welcomeAction,
    'fruits': fruitIntent.fruitAction
  }
  if (data.queryResult.action in actions) {
    const action = data['queryResult']['action']
    const response = !data['queryResult']['parameters'] ? actions[`${action}`]() : actions[`${action}`](data['queryResult']['parameters'])
    res.json(response)
  }
})

module.exports = router
