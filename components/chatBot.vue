<template>
  <div class="container">
    <div class="text-center hd1">
      <img src="../assets/img/bot_background.png" style="height:250px;widht:100px;" alt="bot1">
      <br>
      A Simple Chat Bot
      <br>
      <div class="powered">
        <span>Powered by </span>
        <a href="https://dialogflow.com" target="_blank">
          <img src="../assets/img/dflow.svg">
        </a>
      </div>
      <div class="footer text-center">
        <span class="foo-txt">
          <br>
          Done with <i class="fas fa-heart" /> for JSDayCan2019
        </span>
      </div>
    </div>
    <div id="chatCont" class="chatCont" :style='{"display":(chatContDivIsActive ? "None":"block")}'>
      <div class="bot_profile" :style='{"display":(chatContDivIsActive ? "None":"block")}'>
        <img src="../assets/img/header_chatbot_box.png" class="bot_p_img">
        <div class="close" @click="toggleClass()">
          cerrar
          <i class="fa fa-times" aria-hidden="true" />
        </div>
      </div>
      <div id="result_div" class="resultDiv">
        <p :class="text.class" v-for="text in messages"> {{ text.value }}</p><div class="clearfix"></div> 
      </div>
      <div id="chat-div" class="chatForm">
        <div class="spinner">
          <div class="bounce1" />
          <div class="bounce2" />
          <div class="bounce3" />
        </div>
      </div>
      <input
        id="chat-input"
        v-model="text"
        type="text"
        class="form-control bot-txt"
        autocomplete="off"
        placeholder="Try typing here"
        @keyup.enter="sendText(text)"
      />
    </div>
    <div class="profile_div" :style='{"display":(!profileDivIsActive?"block":"None")}' @click="toggleClass()">
      <div id="chatBotMessage" class="row" :style='{"visibility":(!chatBotMessageIcon ?"hidden":"visible")}'>
        <div class="col-hgt">
          <div class="chat-txt">
            <i class="fas fa-comments" style="font-size: 24px;"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const axios = require('axios')
const utilities = require('../env/env')
export default {
  name: 'chatBot',
  data () {
    return {
      text: '',
      messages: [],
      profileDivIsActive: false,
      chatContDivIsActive: true,
      botProfileDivIsActive: true,
      chatFormDivIsActive: false,
      chatBotMessageIcon: false,
      sessionId: ''
    }
  },

  methods: {
    createHash (length) {
      const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
      for (let i = 0; i < length; i++) {
        this.sessionId += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
      }
      this.sessionId += '-'
    },
    createSession () {
      this.createHash(8)
      this.createHash(4)
      this.createHash(4)
      this.createHash(4)
      this.createHash(12)
    },
    toggleClass () {
      this.profileDivIsActive = this.profileDivIsActive ? false : true 
      this.chatContDivIsActive = this.chatContDivIsActive ? false : true
      this.botProfileDivIsActive = this.profileDivIsActive ? false : true
      this.chatFormDivIsActive = this.chatFormDivIsActive ? false : true
    },
    sendText (text) {
      if (this.text !== '' || this.text.trim !== '') {
        const URL = `${utilities.DIALOG_FLOW_API_ROOT_URL}/projects/${utilities.PROJECT_ID}/agent/sessions/${this.sessionId}:detectIntent`
        const config = {
          headers: {
            'Authorization': 'Bearer ' + utilities.DIALOG_FLOW_TOKEN,
            'Content-Type': 'application/json'
          }
        }

        const bodyParameters = {
          "queryInput": { "text": { "text": text, "languageCode": 'es' } }
        }
        const request = axios.post(
          URL,
          bodyParameters,
          config
        ).then((data) => {
          if (data.status === 200) {
            this.messages.push({ class: 'userEnteredText', value: this.text })
            this.text = ''
            this.messages.push({ class: 'botResult', value: data.data.queryResult.fulfillmentText })
          }
        })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    showChatBot () {
      console.log('llamo a showchatbot')
      this.chatBotMessageIcon = true;
    }
  },
    created: function() {
    this.createSession()
    this.sessionId = this.sessionId.slice(0, -1)
    setTimeout(this.showChatBot, 5000)
  },
}
</script>

<style scoped>
body {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
}

{
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
img {
  -webkit-user-drag: none;
  -moz-user-drag: none;
  -khtml-user-drag: none;
}
a,
a:hover,
a:focus {
  text-decoration: none;
  outline: none;
}
.width100 {
  width: 100%;
}
.text-center {
  text-align: center;
}
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.powered {
  font-size: 17px;
  margin-top: 20px;
}
.powered img {
  width: 110px;
  position: relative;
  top: 8px;
}
.footer {
  margin-top: 50px;
  position: absolute;
  bottom: 40px;
  width: auto;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.foo-txt {
  font-size: 15px;
  font-weight: 400;
  font-family: 'Satisfy', cursive;
  text-shadow: none;
  color: #272727;
}
.fa-heart {
  color: #fb2323;
}

.center .chatCont,
.center .profile_div {
  left: 0;
  right: 0;
  margin: 0 auto;
}
.left .chatCont,
.left .profile_div {
  left: 0;
}
.chatCont {
  position: fixed;
  width: 400px;
  height: 400px !important;
  border: 1px solid #dcdcdc;
  bottom: 65px;
  right: 0;
  background: #efe7dd;
  border-top-left-radius: 3px;
  z-index: 10000;
  display: none;
}
.close {
  position: absolute;
  right: 5px;
  margin-top: -60px;
  color: #868686;
  font-size: 18px;
  cursor: pointer;
}
.bot_profile {
  position: absolute;
  right: 0;
  margin-top: -45px;
  text-align: center;
  width: 400px;
  display: none;
  z-index: 1000;
}
.bot_p_img {
  width: 80px;
  border-radius: 50%;
  width: 80px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0px 1px 0 rgba(0,0,0,0.16), 0 0px 10px 0 rgba(0,0,0,0.12);
}
.chatForm {
  position: absolute;
  bottom: -65px;
  right: 0;
  margin-bottom: 0;
  width: 400px;
  display: none;
}
.bot-txt,
.bot-txt:focus {
  box-shadow: none;
  border-radius: 0;
  height: 66px;
  border: 0;
  border-top: 1px solid #dcdcdc;
  border-left: 1px solid #dcdcdc;
}
.resultDiv .botResult {
  background: rgb(101, 231, 116);
  color: #000;
  border-radius: 3px;
  padding: 12px;
  font-size: 14px;
  font-weight: 400;
  width: 400px;
  float: left;
  box-shadow: 0 0px 1px 0 rgba(0,0,0,0.16),0 0px 10px 0 rgba(0,0,0,0.12);
  border-top-left-radius: 0;
  margin-bottom: 10px;
  margin-top: 5px;
  width: 100%;
  position: relative;
}
.resultDiv .botResult:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-top: 0px solid rgba(0, 0, 0, 0);
  border-bottom: 15px solid rgba(0, 0, 0, 0);
  border-right: 15px solid rgb(101, 231, 116);;
  left: -15px;
  margin-top: -12px;
}
.resultDiv .userEnteredText {
  background: #9C27B0;
  float: right;
  color: #ffffff;
  border-radius: 3px;
  padding: 12px;
  font-size: 15px;
  font-weight: 400;
  width: 400px;
  box-shadow: 0 0px 1px 0 rgba(0,0,0,0.16),0 0px 10px 0 rgba(0,0,0,0.12);
  border-top-right-radius: 0;
  position: relative;
  left: -6px;
  margin-bottom: 10px;
  margin-top: 5px;
  width: 100%;
  word-wrap: break-word;
}
.resultDiv .userEnteredText:before {
  content: "";
  width: 0;
  height: 0;
  border-top: 0px solid rgba(0, 0, 0, 0);
  border-bottom: 15px solid rgba(0, 0, 0, 0);
  border-left: 15px solid #9C27B0;
  position: absolute;
  right: -15px;
  margin-top: -12px;
}
.profile_div {
  position: fixed;
  bottom: 0;
  right: -175px;
  width: 240px;
  cursor: pointer;
}
.img-profile {
  width: 65px;
  box-shadow: 0 0px 1px 0 rgba(0,0,0,0.16), 0 0px 10px 0 rgba(0,0,0,0.12);
  background: white;
  border-radius: 50px;
}
.col-hgt {
  height: 100px;
  display: flex;
  align-items: center;
  float: left;
  margin-right: 10px;
}
.chat-txt {
  box-shadow: 0 0px 1px 0 rgba(0,0,0,0.16),0 0px 10px 0 rgba(0,0,0,0.12);
  padding: 15px 15px;
  border-radius: 50px;
  background: #FF9800;
  float:right;
}

.spinner {
  background: #9C27B0;
  width: 70px;
  text-align: center;
  display: none;
  border-radius: 4px;
  position: relative;
  top: -7px;
  left: 19px;
  padding: 7px 10px;
  border-top-left-radius: 0;
}
.spinner:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-top: 0px solid rgba(0, 0, 0, 0);
  border-bottom: 15px solid rgba(0, 0, 0, 0);
  border-right: 15px solid #9C27B0;
  left: -15px;
  margin-top: -7px;
}
.spinner > div {
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  margin-right: 5px;
}
.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}
@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}

.suggestion {
  background: #fff;
  color: #000;
  border-radius: 3px;
  padding: 12px;
  font-size: 14px;
  font-weight: 400;
  width: 400px;
  float: left;
  box-shadow: 0 0px 1px 0 rgba(0,0,0,0.16), 0 0px 10px 0 rgba(0,0,0,0.12);
  margin-left: 5px;
  border-top-left-radius: 0;
  margin-bottom: 20px;
  width: 100%;
  position: relative;
}
.suggestion:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-top: 0px solid rgba(0, 0, 0, 0);
  border-bottom: 15px solid rgba(0, 0, 0, 0);
  border-right: 15px solid #fff;
  left: -15px;
  margin-top: -12px;
}
.suggestion .sugg-options {
  display: block;
  background: #9c27b0;
  color: #fff;
  text-align: center;
  padding: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 300;
}
.suggestion .sugg-title {
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 10px;
}
.suggestion span:last-child {
  margin-bottom: 0;
}

.resultDiv {
  padding: 35px 20px 30px 20px;
  overflow-y: auto;
  height: 100%;
}
@media screen and (max-width: 500px) {
  .resultDiv .userEnteredText,
  .resultDiv .botResult,
  .suggestion {
    width: 90%;
    margin-bottom: 20px;
  }
  .chatCont,
  .chatForm {
    width: 100%;
  }
  .chatCont {
    height: 70% !important;
  }
}
</style>
