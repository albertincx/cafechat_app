import React from 'react'
import { useTranslation } from '@/i18n/LanguageContext'

interface QuickChipsProps {
  onSelect: (command: string) => void
}

export const QuickChips: React.FC<QuickChipsProps> = ({ onSelect }) => {
  const { t } = useTranslation()

  const commands = [
    { label: '/help', title: t.cmdHelpDesc },
    { label: '/status', title: t.cmdStatusDesc },
    { label: '/ping', title: t.cmdPingDesc },
    { label: '/agent', title: t.cmdAgentDesc },
    { label: '/clear', title: t.cmdClearDesc },
  ]

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto py-1.5 px-3 no-scrollbar select-none border-t border-slate-800/60 bg-[#060a14]/90">
      <span className="text-[10px] font-mono text-slate-500 font-semibold mr-1">QUICK:</span>
      {commands.map(cmd => (
        <button
          key={cmd.label}
          onClick={() => onSelect(cmd.label)}
          title={cmd.title}
          type="button"
          className="shrink-0 px-2.5 py-0.5 rounded-md text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 hover:border-emerald-400 hover:text-emerald-200 transition-all duration-150 active:scale-95 shadow-sm"
        >
          {cmd.label}
        </button>
      ))}
    </div>
  )
}
