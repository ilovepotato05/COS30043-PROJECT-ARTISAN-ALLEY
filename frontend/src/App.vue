<script>
import AppNavbar from './components/common/AppNavbar.vue'
import AppFooter from './components/common/AppFooter.vue'

export default {
  components : {
    AppNavbar,
    AppFooter
  }
}
</script>

<template>
  <div class="app_shell">
    <AppNavbar />
    <router-view />
    <AppFooter />
  </div>
</template>

<style>
html,
body,
#app {
  background: #EAE0C7;
  width: 100%;
  overflow-x: hidden;
}

html,
body,
#app {
  min-height: 100%;
}

.app_shell {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
