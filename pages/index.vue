<template>
  <div class="container">
    <div>
      Simple div
    </div>
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
