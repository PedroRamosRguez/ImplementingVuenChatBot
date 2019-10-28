
<h1 align="center">Workshop: Implementando nuestro Vuen Chatbot</h1>
<p align="center">
  <a href="https://nuxtjs.org/">
  <img src="https://avatars2.githubusercontent.com/u/23360933?s=200&v=4" height="100">
  </a>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/500px-Plus_symbol.svg.png" height="80">
  <img src="https://upload.wikimedia.org/wikipedia/en/c/c7/Dialogflow_logo.svg" height="80">
</p>

This is a workshop for implementing a chatbot uysing [Vue](https://vuejs.org/), [Nuxt](https://nuxtjs.org/) and [Dialogflow](https://dialogflow.com/) for [JsDay Canarias 2019](https://jsdaycanarias.com/) done by [Pedro Ramos](https://github.com/pedroramosrguez). You can follow me on twitter too [💙](https://twitter.com/pramos90).

The workshop is divided into several branchs. Lets try to follow the regarding steps for getting the final result

# Step 1. Install the necesary tools

Try to install the tools before to start the workshop

The different tools that we need:

* [Ngrok download from this link](https://ngrok.com/download)
* Node
    * [For Windows. Download from this link](https://nodejs.org/es/download/)
    * For Mac: 
        * First install home brew:
            * `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
        * Instal via Brew:
            * `brew install node`
    * For Linux:
        * Install curl:
            * `sudo apt-get install curl`
        * Download via curl NodeJs LTS version:
            * `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`
        * Install Nodejs **Ubuntu**:
            * `sudo apt-get install nodejs`
* A Gmail Account
* Google CLI:
    * [For windows](https://cloud.google.com/sdk/docs/quickstart-windows?hl=es)
    * [For MacOs](https://cloud.google.com/sdk/docs/quickstart-macos?hl=es)
    * [For Debian Ubuntu](https://cloud.google.com/sdk/docs/quickstart-debian-ubuntu?hl=es)

# Step 2. Clone the repository

Clone this repository in your locale machine using this command:
```sh
git clone https://github.com/[YOUR-USERNAME]/ImplementingVuenChatBot
```

# Step 3. Install the dependencies and run the server

In the project folder install the dependencies using the next command:

```sh
npm install
```

The next step will be to run the server using the next command:

```sh
npm run dev
```
 If everything is ok, we can continue in the next steps

# Step 4. Deleting the nuxt cli component

After run a server, the next step will be to delete the component created by NUXT CLI. We will need to delete everything inside of `/components/Logo.vue`, rename the component to Chatbot.vue, and write only a h1 tag.
Then we need to change in `pages/index.vue` the **Logo.vue** import and change it by **Chatbot.vue**. Finally we need to change the component name in `test/Logo.spec.js`.
The final result have to be like the [starting_app branch](https://github.com/PedroRamosRguez/ImplementingVuenChatBot/tree/starting_app)

```sh
git checkout starting_app
```

# Step 5. Implementing the chatbot component (adding style, svgs, etc).

This step is too long for doing in the workshop beacuse is add so much style to the component. Lets change to [creating_chatbot_component branch](https://github.com/PedroRamosRguez/ImplementingVuenChatBot/tree/creating_chatbot_component)

```sh
git checkout creating_chatbot_component
```

This step will be showed in live explaining the branch content. 

# Step 6. Create server endpoints and component functions.

This is another too long step. In this step we need to create all the component needed functions to link client side with **DialogFlow** Agent.
The result of this step is showed in the [creating_client_functions branch](https://github.com/PedroRamosRguez/ImplementingVuenChatBot/tree/creating_client_functions)

```sh
git checkout creating_client_functions
```

This step will be showed in live explaining each created functions.

we need to add the endpoints to link **DialogFlow** agent to our app.

First at all, lets create a chatbot folder with a routes.js file with the next content 

```javascript
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
```

Then import the routes in `server/index.js` file above  `app.use(nuxt.render)`

```javascript
const chatbot = require('../chatbot/routes')
app.use(chatbor)
```

With this configuration, we will can to access the server endpoints.

# Step 7. Create the agent with Dialogflow

* Go to [Dialogflow web](https://dialogflow.com). Sign in with a google account.
* Press the button **go to console** on the top-right side.
* Create an agent. Put spanish language please.
* After that, press tool button and go into **Export and Import section**, select **restore from zip** and upload the zip file that you will find in the [creating_client_functions branch](https://github.com/PedroRamosRguez/ImplementingVuenChatBot/tree/creating_client_functions).

* Step 8. Using Ngrok and config fulfillment agent option:

* Open ngrok console.
* Type ngrok http 3000.
* Copy https link.
* Go into fulfillment options in Dialogflow 
* Toogle webhook option to enable
* Paste the ngrok https link into url options with /chatbot

# Step 9. Using Google sdk console, create service account, create env files and get token from app

* Go to [Google Cloud Console](https://console.cloud.google.com/?hl=es)
* Select in the top side the dialogflow app
* Go to toolbar on the left side
* Go in API AND SERVICES
* Go in CREDENTIALS
* Press in select create credentials button
* Select service account key
* Select Dialogflow API
* Select JSON option
* Create Button and save the json file

Then open the Google Cloud SDK Shell downloaded from Google CLI and put the next commands

```sh
gcloud auth activate-service-account --key-file="PATH to the json file created before"
gcloud auth print-access-token
```

With theese commands we have created a token to link our client app to the **Dialogflow agent*

Create an env folder with a env.js file and add theese lines:

```javascript
const FULFILLMENT = 'ngrok https link'
const DIALOG_FLOW_TOKEN = 'token created with the gcloud auth print-access-token command '
const DIALOG_FLOW_API_ROOT_URL = 'https://dialogflow.googleapis.com/v2'
const PROJECT_ID = 'project_id from json file created'

module.exports = { FULFILLMENT, DIALOG_FLOW_TOKEN, DIALOG_FLOW_API_ROOT_URL, PROJECT_ID }
```

# Step 10. Test everything

Finally, if everything is ok, we will have our Vue chatbot component created and linked with our Dialogflow agent

I hope you liked this workshop ✨ learned a lot, and hope to see you in the next one 👋.
