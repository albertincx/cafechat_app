import React from 'react'
import {
  Volume2,
  VolumeX,
  RotateCcw,
  X,
  Activity,
  Headphones,
  Globe,
} from 'lucide-react'
import { ConnectionStatus } from '@/types/chat'
import { useTranslation } from '@/i18n/LanguageContext'

interface ChatHeaderProps {
  status: ConnectionStatus
  latency: number
  soundEnabled: boolean
  onToggleSound: () => void
  onClearChat: () => void
  onClose: () => void
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  status,
  latency,
  soundEnabled,
  onToggleSound,
  onClearChat,
  onClose,
}) => {
  const { lang, toggleLang, t } = useTranslation()

  return (
    <div className="relative border-b border-slate-800/80 bg-[#080d17]/95 px-4 py-3 backdrop-blur-md select-none">
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

      <div className="flex items-center justify-between">
        {/* Left: Support Title & Status */}
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <Headphones className="w-4 h-4 text-emerald-400" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-wide text-white">
                {t.headerTitle}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {t.badgeStatus}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    status === 'connected'
                      ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                      : status === 'connecting'
                      ? 'bg-amber-400 animate-pulse'
                      : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                  }`}
                />
                <span>
                  {status === 'connected' ? t.online : t.localMode}
                </span>
              </span>

              <span className="text-slate-600">•</span>

              <span className="flex items-center gap-1 text-slate-400">
                <Activity className="w-3 h-3 text-emerald-400/80" />
                <span>{latency}{t.latency}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Language Selector */}
        <div className="flex items-center gap-1">
          {/* Language Switcher Pill */}
          <button
            onClick={toggleLang}
            type="button"
            title={lang === 'en' ? 'Switch to Russian' : 'Переключить на английский'}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono font-medium text-slate-300 hover:text-white bg-[#0e1626] border border-slate-700/60 hover:border-emerald-500/50 transition-colors shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            type="button"
            title={soundEnabled ? t.soundOn : t.soundOff}
            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Clear Chat */}
          <button
            onClick={onClearChat}
            type="button"
            title={t.clearChat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            title={t.closeChat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 border border-transparent hover:border-rose-500/20 transition-colors ml-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
