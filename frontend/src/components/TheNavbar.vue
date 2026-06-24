<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'

defineProps<{
  websiteName: string
}>()

const emit = defineEmits<{
  (e: 'login-click'): void
}>()

const { t, locale } = useI18n()

const currentLocale = ref(locale.value as string)

const menuItems = ref([
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.blog', to: '/blog' },
  { labelKey: 'nav.files', to: '/files' },
  { labelKey: 'nav.about', to: '/about' },
])

function handleLogin() {
  emit('login-click')
}

function toggleLocale() {
  const newLocale = currentLocale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  currentLocale.value = newLocale
  locale.value = newLocale
  document.documentElement.setAttribute('lang', newLocale)
  localStorage.setItem('locale', newLocale)
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <RouterLink to="/" class="brand-link">{{ websiteName }}</RouterLink>
      </div>
      
      <div class="navbar-menu desktop-menu">
        <RouterLink 
          v-for="item in menuItems" 
          :key="item.to"
          :to="item.to"
          class="nav-link"
        >
          {{ t(item.labelKey) }}
        </RouterLink>
      </div>

      <div class="navbar-actions desktop-menu">
        <button class="locale-toggle" @click="toggleLocale">
          <span class="locale-globe">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </span>
          <span class="locale-text">
            <span class="locale-label zh" :class="{ active: currentLocale === 'zh-CN' }">中</span>
            <span class="locale-divider">/</span>
            <span class="locale-label en" :class="{ active: currentLocale === 'en-US' }">EN</span>
          </span>
        </button>
        <Button 
          :label="t('nav.login') + '/' + t('nav.register')" 
          severity="secondary"
          outlined
          @click="handleLogin"
        />
      </div>

      <div class="mobile-menu">
        <i class="pi pi-bars" style="font-size: 1.5rem"></i>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(22, 23, 29, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(203, 189, 255, 0.15);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand .brand-link {
  font-size: 1.25rem;
  font-weight: 600;
  color: #cbbdffff;
  text-decoration: none;
  letter-spacing: 0.5px;
  transition: color 0.3s;
}

.navbar-brand .brand-link:hover {
  color: #b2d6ffff;
}

.desktop-menu {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 8px 0;
  position: relative;
  transition: color 0.3s;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #cbbdffff, #acdcffff);
  transition: width 0.3s;
}

.nav-link:hover {
  color: #cbbdffff;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.router-link-active {
  color: #b2d6ffff;
}

.nav-link.router-link-active::after {
  width: 100%;
}

/* Locale Toggle Button */
.locale-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(203, 189, 255, 0.08);
  border: 1px solid rgba(203, 189, 255, 0.25);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #cbbdffff;
}

.locale-toggle:hover {
  background: rgba(203, 189, 255, 0.15);
  border-color: rgba(203, 189, 255, 0.5);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(203, 189, 255, 0.15);
}

.locale-toggle:active {
  transform: translateY(0);
}

.locale-globe {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.3s, transform 0.3s;
}

.locale-toggle:hover .locale-globe {
  opacity: 1;
  transform: rotate(15deg);
}

.locale-text {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.locale-label {
  transition: all 0.3s ease;
  opacity: 0.5;
}

.locale-label.zh {
  color: #9ca3af;
}

.locale-label.en {
  color: #9ca3af;
}

.locale-divider {
  color: rgba(203, 189, 255, 0.4);
  font-weight: 300;
}

/* Active state - highlight current language */
.locale-label.zh.active {
  opacity: 1;
  color: #cbbdffff;
  font-weight: 600;
  text-shadow: 0 0 8px rgba(203, 189, 255, 0.5);
}

.locale-label.en.active {
  opacity: 1;
  color: #b2d6ffff;
  font-weight: 600;
  text-shadow: 0 0 8px rgba(178, 214, 255, 0.5);
}

/* Hide inactive on hover for cleaner look */
.locale-toggle:hover .locale-label:not(.active) {
  opacity: 0.4;
}

.navbar-actions :deep(.p-button) {
  background: transparent;
  border: 1px solid rgba(203, 189, 255, 0.4);
  color: #cbbdffff;
  font-weight: 500;
  transition: all 0.3s;
}

.navbar-actions :deep(.p-button:hover) {
  background: rgba(203, 189, 255, 0.15);
  border-color: #cbbdffff;
}

.mobile-menu {
  display: none;
  cursor: pointer;
  color: #cbbdffff;
}

@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }
  
  .mobile-menu {
    display: block;
  }
  
  .navbar-container {
    padding: 0 16px;
  }
}
</style>
