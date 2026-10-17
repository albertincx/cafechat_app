import React from 'react'
import { Headphones } from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'

export const TypingIndicator: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-2 py-1.5 px-3 my-1.5 rounded-xl bg-[#0d1525] border border-slate-700/50 w-fit shadow-sm">
      <Headphones className="w-3.5 h-3.5 text-emerald-400" />
      <div className="flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
      </div>
      <span className="text-[11px] font-sans text-slate-400">
        {t.typing}
      </span>
    </div>
  )
}
