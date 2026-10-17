import React from 'react'
import { Check, CheckCheck, Headphones, Info } from 'lucide-react'
import { ChatMessage } from '@/types/chat'
import { useTranslation } from '@/i18n/LanguageContext'

interface MessageItemProps {
  message: ChatMessage
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { t } = useTranslation()
  const isMine = message.sender === 'user'
  const isSystem = message.isSystem || message.sender === 'system'

  if (isSystem) {
    return (
      <div className="my-2.5 px-3.5 py-2.5 rounded-xl bg-[#090d18] border border-slate-800 text-slate-300 font-sans text-xs leading-relaxed shadow-sm">
        <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono font-bold tracking-wider mb-1">
          <Info className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.systemNotice} // {message.timestamp}</span>
        </div>
        <div className="whitespace-pre-wrap select-text">{message.text}</div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col my-2 ${isMine ? 'items-end' : 'items-start'}`}>
      {/* Sender Header Label */}
      <div className="flex items-center gap-1.5 px-1 mb-1 text-[11px] font-medium text-slate-400">
        {!isMine && (
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <Headphones className="w-3 h-3" />
            <span>{message.author || t.supportAgent}</span>
          </span>
        )}
        {isMine && <span className="text-slate-300 font-semibold">{t.you}</span>}
        <span className="text-slate-600">•</span>
        <span className="text-slate-500 font-mono text-[10px]">{message.timestamp}</span>
      </div>

      {/* Message Bubble Card */}
      <div
        className={`relative group max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 shadow-lg backdrop-blur-md transition-all ${
          isMine
            ? 'bg-gradient-to-br from-[#0c241c] to-[#081712] border border-emerald-500/40 text-slate-100 rounded-tr-sm shadow-[0_4px_16px_rgba(16,185,129,0.12)]'
            : 'bg-gradient-to-br from-[#111827] to-[#0b0f19] border border-slate-700/60 text-slate-100 rounded-tl-sm shadow-[0_4px_16px_rgba(0,0,0,0.4)]'
        }`}
      >
        {/* Message Image attachment if present */}
        {message.img && (
          <div className="mb-2 rounded-lg overflow-hidden border border-slate-700/60">
            <img
              src={message.img}
              alt="attachment"
              className="max-h-52 w-full object-cover rounded"
            />
          </div>
        )}

        {/* Message Text */}
        <div className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap select-text break-words font-sans">
          {message.text}
        </div>

        {/* Status Checkmark & Timestamp */}
        <div className="mt-1 flex items-center justify-end gap-1.5 text-[10px] font-mono text-slate-400">
          {isMine && (
            <span>
              {message.status === 'delivered' ? (
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400 inline" />
              ) : (
                <Check className="w-3.5 h-3.5 text-slate-400 inline" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
