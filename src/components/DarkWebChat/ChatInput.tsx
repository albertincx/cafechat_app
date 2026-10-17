import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import { Send, Image } from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'

interface ChatInputProps {
  onSend: (text: string, img?: string) => void
  disabled?: boolean
  inputRef?: React.RefObject<HTMLTextAreaElement | null>
}

const MIN_HEIGHT = 40
const MAX_HEIGHT = 160

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled, inputRef }) => {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [selectedImg, setSelectedImg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const localRef = useRef<HTMLTextAreaElement>(null)
  const actualRef = inputRef || localRef

  const adjustHeight = useCallback(() => {
    const el = actualRef.current
    if (!el) return
    el.style.height = 'auto'
    const scrollHeight = el.scrollHeight
    if (scrollHeight <= MIN_HEIGHT) {
      el.style.height = `${MIN_HEIGHT}px`
      el.style.overflowY = 'hidden'
    } else if (scrollHeight >= MAX_HEIGHT) {
      el.style.height = `${MAX_HEIGHT}px`
      el.style.overflowY = 'auto'
    } else {
      el.style.height = `${scrollHeight}px`
      el.style.overflowY = 'hidden'
    }
  }, [actualRef])

  useLayoutEffect(() => {
    adjustHeight()
  }, [text, adjustHeight])

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if ((!text.trim() && !selectedImg) || disabled) return

    onSend(text, selectedImg || undefined)
    setText('')
    setSelectedImg(null)

    if (actualRef.current) {
      actualRef.current.style.height = `${MIN_HEIGHT}px`
      actualRef.current.style.overflowY = 'hidden'
      actualRef.current.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    adjustHeight()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImg(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="border-t border-slate-800/80 bg-[#080d17]/95 p-3 backdrop-blur-md">
      {/* Attached Image Preview */}
      {selectedImg && (
        <div className="relative mb-2 w-fit">
          <img
            src={selectedImg}
            alt="Upload preview"
            className="w-16 h-16 object-cover rounded-lg border border-emerald-500/50 shadow-md"
          />
          <button
            onClick={() => setSelectedImg(null)}
            type="button"
            className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-600 hover:bg-rose-500 text-white rounded-full flex items-center justify-center text-xs font-bold transition-transform hover:scale-110"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Attachment Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title={t.attachImage}
          disabled={disabled}
          className="h-10 w-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition-all shrink-0 disabled:opacity-40 disabled:pointer-events-none"
        >
          <Image className="w-4 h-4" />
        </button>

        {/* Text Input Container */}
        <div className="relative flex-1 min-w-0 bg-[#050811] rounded-xl border border-slate-700/70 hover:border-slate-600 focus-within:border-emerald-500/80 focus-within:ring-1 focus-within:ring-emerald-500/30 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all">
          <textarea
            ref={actualRef as any}
            rows={1}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={t.placeholder}
            disabled={disabled}
            className="block w-full bg-transparent text-slate-100 placeholder:text-slate-500 text-xs sm:text-[13px] py-2.5 px-3.5 focus:outline-none resize-none font-sans leading-5 overflow-hidden transition-[height] duration-75 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ height: `${MIN_HEIGHT}px`, maxHeight: `${MAX_HEIGHT}px` }}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={(!text.trim() && !selectedImg) || disabled}
          aria-label={t.send}
          title={t.send}
          className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 border border-emerald-400/50 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none shadow-[0_0_12px_rgba(16,185,129,0.2)] hover:shadow-[0_0_18px_rgba(16,185,129,0.4)] shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Keyboard Shortcut Hint */}
      <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] font-mono text-slate-500 select-none">
        <span>{t.sendHint}</span>
        <span className="text-emerald-500/60 hidden sm:inline">TeleChat Web v2</span>
      </div>
    </div>
  )
}
