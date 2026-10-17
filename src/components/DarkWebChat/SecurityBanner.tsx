import React from 'react'
import { ShieldCheck, User } from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'

interface SecurityBannerProps {
  uid: string
}

export const SecurityBanner: React.FC<SecurityBannerProps> = ({ uid }) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-between px-4 py-1.5 bg-[#050811] border-b border-slate-800/60 text-[11px] font-mono text-slate-400 select-none">
      <div className="flex items-center gap-1.5 text-emerald-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span className="font-medium tracking-wide">E2EE 256-BIT</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 text-slate-400">
          <User className="w-3 h-3 text-slate-500" />
          <span className="text-slate-300 truncate max-w-[120px]">{uid}</span>
        </span>
      </div>
    </div>
  )
}
