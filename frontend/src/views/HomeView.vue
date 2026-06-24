<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="home-view">
    <div class="hero-content">
      <h1 class="hero-title">{{ t('home.title') }}</h1>
      <p class="hero-subtitle">{{ t('home.subtitle') }}</p>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
  padding-top: 64px;
  position: relative;
  z-index: 1;
}

.hero-content {
  text-align: center;
  animation: fadeIn 1s ease-out;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  background: linear-gradient(135deg, #cbbdffff 0%, #b2d6ffff 50%, #acdcffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 16px;
  letter-spacing: -2px;
  text-shadow: 0 0 40px rgba(203, 189, 255, 0.3);
}

.hero-subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: #9ca3af;
  margin: 0;
  font-weight: 400;
  letter-spacing: 2px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
