<template>
  <div class="main">
    <a href="https://github.com/PedroRamosRguez/ImplementingVuenChatBot">
      <img style="position: absolute; top: 0; right: 0; border: 0;" src="../assets/img/star.svg">
    </a>
    <chatBot />
  </div>
</template>

<script>
import chatBot from '~/components/chatBot.vue'

export default {
  components: {
    chatBot
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
