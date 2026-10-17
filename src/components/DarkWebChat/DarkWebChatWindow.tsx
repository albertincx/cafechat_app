import React, { useRef, useEffect, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { ChatHeader } from './ChatHeader'
import { SecurityBanner } from './SecurityBanner'
import { MessageItem } from './MessageItem'
import { QuickChips } from './QuickChips'
import { TypingIndicator } from './TypingIndicator'
import { ChatInput } from './ChatInput'
import { ChatMessage, ConnectionStatus } from '@/types/chat'
import { useTranslation } from '@/i18n/LanguageContext'

interface DarkWebChatWindowProps {
  isOpen: boolean
  onClose: () => void
  messages: ChatMessage[]
  onSendMessage: (text: string, img?: string) => void
  status: ConnectionStatus
  latency: number
  soundEnabled: boolean
  onToggleSound: () => void
  onClearChat: () => void
  isTyping: boolean
  uid: string
}

export const DarkWebChatWindow: React.FC<DarkWebChatWindowProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  status,
  latency,
  soundEnabled,
  onToggleSound,
  onClearChat,
  isTyping,
  uid,
}) => {
  const { t } = useTranslation()
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [showScrollBottom, setShowScrollBottom] = useState(false)

  // Scroll to bottom helper
  const scrollToBottom = (smooth = true) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      })
    }
  }

  // Handle auto-scroll on new messages or typing
  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isTyping, isOpen])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 150)
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Check scroll position to display scroll bottom button
  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight)
    setShowScrollBottom(distanceToBottom > 80)
  }

  const handleChipSelect = (cmd: string) => {
    onSendMessage(cmd)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[calc(100vh-7.5rem)] flex flex-col rounded-2xl bg-[#090e18]/95 border border-slate-700/60 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-2xl overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95"
      role="dialog"
      aria-modal="true"
      aria-label={t.headerTitle}
    >
      {/* Header */}
      <div className="relative z-30">
        <ChatHeader
          status={status}
          latency={latency}
          soundEnabled={soundEnabled}
          onToggleSound={onToggleSound}
          onClearChat={onClearChat}
          onClose={onClose}
        />
        <SecurityBanner uid={uid} />
      </div>

      {/* Message List Area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="relative z-10 flex-1 overflow-y-auto p-4 space-y-1 bg-gradient-to-b from-[#090e18] via-[#060a12] to-[#070c16]"
      >
        {messages.map(msg => (
          <MessageItem key={msg.id} message={msg} />
        ))}

        {isTyping && <TypingIndicator />}
      </div>

      {/* Floating Scroll to Bottom Button */}
      {showScrollBottom && (
        <button
          onClick={() => scrollToBottom(true)}
          type="button"
          aria-label={t.scrollToBottom}
          title={t.scrollToBottom}
          className="absolute bottom-28 right-5 z-30 p-2.5 rounded-full bg-[#0d1627] border border-slate-700 text-slate-300 hover:text-white shadow-lg transition-all animate-bounce"
        >
          <ArrowDown className="w-4 h-4 text-emerald-400" />
        </button>
      )}

      {/* Quick Command Chips */}
      <div className="relative z-30">
        <QuickChips onSelect={handleChipSelect} />
      </div>

      {/* Chat Input */}
      <div className="relative z-30">
        <ChatInput onSend={onSendMessage} inputRef={inputRef} />
      </div>
    </div>
  )
}
