import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Chat from '@/pages/Chat'
import { Provider } from 'react-redux'
import configure from '@/utils/configureStore'
import { LanguageProvider } from './i18n/LanguageContext'

const rootElement = document.getElementById('apppopupmax')

if (!rootElement) {
  throw new Error('Failed to find the root element')
}

const store = configure()
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <Chat />
      </LanguageProvider>
    </Provider>
  </StrictMode>,
)
