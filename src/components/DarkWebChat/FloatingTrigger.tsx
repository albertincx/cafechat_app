import React from 'react'
import { MessageSquare, X } from 'lucide-react'
import { ConnectionStatus } from '@/types/chat'
import { useTranslation } from '@/i18n/LanguageContext'

interface FloatingTriggerProps {
  isOpen: boolean
  onClick: () => void
  unreadCount: number
  status: ConnectionStatus
}

export const FloatingTrigger: React.FC<FloatingTriggerProps> = ({
  isOpen,
  onClick,
  unreadCount,
  status,
}) => {
  const { t } = useTranslation()

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Pop-over unread pill when closed */}
      {!isOpen && unreadCount > 0 && (
        <div className="animate-bounce bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md font-sans flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{t.newMessages} ({unreadCount})</span>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={onClick}
        type="button"
        aria-label={isOpen ? t.closeChat : t.openChat}
        className={`group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#090d16] border transition-all duration-300 shadow-2xl backdrop-blur-xl ${
          isOpen
            ? 'border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-95'
            : 'border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:border-emerald-400 hover:scale-105'
        }`}
      >
        {/* Radar Pulse Effect when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-2xl border border-emerald-500/30 radar-pulse pointer-events-none" />
        )}

        {/* Ambient subtle glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 group-hover:opacity-100 transition-opacity" />

        {/* Status Dot */}
        <span
          className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#090d16] ${
            status === 'connected'
              ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
              : status === 'connecting'
              ? 'bg-amber-400 animate-pulse'
              : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
          }`}
          title={`${t.headerTitle}: ${status === 'connected' ? t.online : t.localMode}`}
        />

        {/* Unread Counter Badge */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-2 -left-2 min-w-5 h-5 px-1.5 flex items-center justify-center text-[10px] font-bold font-mono text-black bg-emerald-400 border border-emerald-300 rounded-full shadow-[0_0_12px_#34d399] animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}

        {/* Icon */}
        <div className="relative z-10 text-emerald-400 group-hover:text-emerald-300 transition-colors">
          {isOpen ? (
            <X className="w-6 h-6 text-slate-200 transition-transform duration-200" />
          ) : (
            <MessageSquare className="w-6 h-6 text-emerald-400" />
          )}
        </div>

        {/* Hover Tooltip for Desktop */}
        <span className="hidden md:group-hover:block absolute right-full mr-3.5 px-3 py-1.5 text-xs font-medium tracking-wide text-slate-200 bg-[#0c121e]/95 border border-slate-700/80 rounded-lg whitespace-nowrap shadow-xl pointer-events-none backdrop-blur-md">
          {isOpen ? t.closeChat : t.openChat}
        </span>
      </button>
    </div>
  )
}
