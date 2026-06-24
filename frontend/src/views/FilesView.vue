<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="files-view">
    <div class="files-content">
      <h1 class="files-title">{{ t('files.title') }}</h1>
      <p class="files-text">{{ t('files.comingSoon') }}</p>
    </div>
  </div>
</template>

<style scoped>
.files-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
  padding-top: 64px;
  position: relative;
  z-index: 1;
}

.files-content {
  text-align: center;
  animation: fadeIn 1s ease-out;
}

.files-title {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 600;
  color: #cbbdffff;
  margin: 0 0 24px;
  letter-spacing: -1px;
}

.files-text {
  font-size: 1.25rem;
  color: #9ca3af;
  margin: 0;
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
