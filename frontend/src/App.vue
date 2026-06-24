<script setup lang="ts">
import TheNavbar from './components/TheNavbar.vue'
import ParticleCanvas from './components/ParticleCanvas.vue'

// Website name - could be moved to config in the future
const WEBSITE_NAME = 'CodeProject'
</script>

<template>
  <div class="app dark-mode">
    <ParticleCanvas />
    <TheNavbar :website-name="WEBSITE_NAME" />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  position: relative;
}

.main-content {
  position: relative;
  z-index: 1;
}
</style>
