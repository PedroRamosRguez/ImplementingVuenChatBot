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
          Done <i class="fas fa-heart"></i>for JSDayCan2019
        </span>
      </div>
    </div>
  </div>
</template>
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
</style>
