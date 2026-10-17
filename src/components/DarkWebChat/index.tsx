import React from 'react'
import { useDarkWebChat } from '@/hooks/useDarkWebChat'
import { FloatingTrigger } from './FloatingTrigger'
import { DarkWebChatWindow } from './DarkWebChatWindow'
import { useTranslation } from '@/i18n/LanguageContext'

export const DarkWebChatWidget: React.FC = () => {
  const { lang } = useTranslation()
  const {
    isOpen,
    toggleOpen,
    messages,
    sendMessage,
    unreadCount,
    status,
    isTyping,
    soundEnabled,
    toggleSound,
    latency,
    uid,
    clearChat,
  } = useDarkWebChat(lang)

  return (
    <>
      <DarkWebChatWindow
        isOpen={isOpen}
        onClose={toggleOpen}
        messages={messages}
        onSendMessage={sendMessage}
        status={status}
        latency={latency}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onClearChat={clearChat}
        isTyping={isTyping}
        uid={uid}
      />

      <FloatingTrigger
        isOpen={isOpen}
        onClick={toggleOpen}
        unreadCount={unreadCount}
        status={status}
      />
    </>
  )
}

export default DarkWebChatWidget
