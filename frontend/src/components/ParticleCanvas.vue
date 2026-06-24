<script setup lang="ts">
import { ref } from 'vue'
import { useParticles } from '@/composables/useParticles'

const canvasRef = ref<HTMLCanvasElement | null>(null)
useParticles(canvasRef)
</script>

<template>
  <canvas ref="canvasRef" class="particle-canvas" />
</template>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}
</style>
