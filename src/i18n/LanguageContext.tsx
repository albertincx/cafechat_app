import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, TranslationStrings, translations } from './translations'
import Storage from '@/utils/storage'

const LANG_STORAGE_KEY = 'telechat_language'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: TranslationStrings
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
  toggleLang: () => {},
})

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = Storage.get(LANG_STORAGE_KEY)
    if (saved === 'ru' || saved === 'en') {
      return saved
    }
    return 'en' // Default is English
  })

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    Storage.set(LANG_STORAGE_KEY, newLang)
  }

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ru' : 'en')
  }

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang],
        toggleLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useTranslation = () => useContext(LanguageContext)
