import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { availableLocales } from '@/locales'

const currentLocale = ref<string>('zh-CN')

export function useLocale() {
  const { locale } = useI18n()

  const currentLocaleName = computed(() => {
    const found = availableLocales.find(l => l.code === currentLocale.value)
    return found?.name || '中文'
  })

  function setLocale(code: 'zh-CN' | 'en-US') {
    currentLocale.value = code
    locale.value = code
    document.documentElement.setAttribute('lang', code)
    localStorage.setItem('locale', code)
  }

  function initLocale() {
    const saved = localStorage.getItem('locale')
    if (saved && (saved === 'zh-CN' || saved === 'en-US')) {
      setLocale(saved)
    } else {
      setLocale('zh-CN')
    }
  }

  function toggleLocale() {
    const newLocale = currentLocale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
    setLocale(newLocale)
  }

  return {
    currentLocale,
    currentLocaleName,
    availableLocales,
    setLocale,
    initLocale,
    toggleLocale,
  }
}
