<template>
  <div id="app">
    <home v-if="this.$store.state.common.show"/> 
    <login v-else/>
  </div>
</template>

<script>

import home from './pages/Home.vue'
import login from './pages/Login.vue'

export default {
  name: 'app',
  components: {
    home,
    login,
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app,html,body{
  overflow:hidden;
  width: 100%;
  height: 100%;
  /* background:skyblue; */
}
</style>
