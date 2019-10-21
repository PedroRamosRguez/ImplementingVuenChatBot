const express = require('express')
const consola = require('consola')
const bodyparser = require('body-parser');
const { Nuxt, Builder } = require('nuxt')
const app = express()
app.use(bodyparser.json());

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)
  
  //Chatbot Endpoint
  app.post('/chatbot', (req, res) => {
    const data = req.body;
    const response = {
      fulfillmentText: "Your webhook works fine !",
    }
	  res.json(response);
  });

  //Status Endpoint
  app.get('/status', (req, res) => {
    res.send('OK')
  })

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
