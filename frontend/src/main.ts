import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from './locales'

const app = createApp(App)

// Global app config
app.provide('websiteName', 'CodeProject')

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark-mode',
      cssLayer: false,
    },
  },
})

app.use(router)
app.use(i18n)

// Initialize locale after i18n is installed
const savedLocale = localStorage.getItem('locale')
if (savedLocale && (savedLocale === 'zh-CN' || savedLocale === 'en-US')) {
  (i18n.global.locale as unknown as { value: string }).value = savedLocale
} else {
  (i18n.global.locale as unknown as { value: string }).value = 'zh-CN'
}

app.mount('#app')
