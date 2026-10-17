import React from 'react'
import DarkWebChatWidget from '@/components/DarkWebChat'
import { MessageSquare, Zap, Globe, Sparkles, Layers } from 'lucide-react'
import { useTranslation } from '@/i18n/LanguageContext'

function ChatContent () {
  const { lang, toggleLang, t } = useTranslation()

  return (
    <div className='relative min-h-screen bg-[#060911] text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30 selection:text-emerald-300'>
      {/* Background Subtle Gradient & Glow */}
      <div className='absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none' />
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none' />

      {/* Main Container */}
      <main className='relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-16'>
        {/* Navigation / Header */}
        <header className='flex items-center justify-between pb-8 border-b border-slate-800/80'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]'>
              <MessageSquare className='w-5 h-5 text-emerald-400' />
            </div>
            <div>
              <h1 className='text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2'>
                TeleChat
                <span className='text-[11px] px-2 py-0.5 rounded-full font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'>
                  v2.0
                </span>
              </h1>
              <p className='text-xs text-slate-400 font-sans'>
                {t.appSubtitle}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            {/* Language Switcher in Navbar */}
            <button
              onClick={toggleLang}
              type='button'
              className='flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-200 bg-[#0d1424] border border-slate-700/80 hover:border-emerald-500/60 hover:text-white transition-all shadow-sm'
            >
              <Globe className='w-3.5 h-3.5 text-emerald-400' />
              <span>Language: <strong className='text-emerald-400 uppercase'>{lang}</strong></span>
            </button>

            <div className='hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0d1424] border border-slate-800 text-xs font-mono text-slate-400'>
              <span className='w-2 h-2 rounded-full bg-emerald-400 animate-ping' />
              <span className='text-emerald-400'>{t.online}</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className='py-14 md:py-24 text-center max-w-3xl mx-auto space-y-6'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono shadow-sm'>
            <Sparkles className='w-3.5 h-3.5 text-emerald-400' />
            <span>{t.heroBadge}</span>
          </div>

          <h2 className='text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans'>
            {t.heroTitle1} <br />
            <span className='bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent'>
              {t.heroTitle2}
            </span>
          </h2>

          <p className='text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans'>
            {t.heroDesc}
          </p>

          <div className='pt-4 flex flex-wrap items-center justify-center gap-4'>
            <button
              onClick={() => window.instantChatBot?.open()}
              type='button'
              className='group px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all duration-200 active:scale-95 flex items-center gap-2'
            >
              <MessageSquare className='w-4 h-4 text-black group-hover:scale-110 transition-transform' />
              <span>{t.heroOpenBtn}</span>
            </button>

            <a
              href='#features'
              className='px-6 py-3.5 rounded-xl bg-[#0c1220] border border-slate-700/80 hover:border-emerald-500/50 text-slate-300 hover:text-white text-sm font-medium transition-all duration-200'
            >
              {t.heroTechBtn}
            </a>
          </div>
        </section>

        {/* Feature Grid */}
        <section id='features' className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 pb-16'>
          <div className='p-6 rounded-2xl bg-[#0a0f1d]/80 border border-slate-800 shadow-xl backdrop-blur-md space-y-3 hover:border-slate-700 transition-all'>
            <div className='p-2.5 w-fit rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-400'>
              <Layers className='w-5 h-5' />
            </div>
            <h3 className='text-base font-bold text-white font-sans'>{t.feat1Title}</h3>
            <p className='text-xs text-slate-400 leading-relaxed font-sans'>
              {t.feat1Desc}
            </p>
          </div>

          <div className='p-6 rounded-2xl bg-[#0a0f1d]/80 border border-slate-800 shadow-xl backdrop-blur-md space-y-3 hover:border-slate-700 transition-all'>
            <div className='p-2.5 w-fit rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400'>
              <MessageSquare className='w-5 h-5' />
            </div>
            <h3 className='text-base font-bold text-white font-sans'>{t.feat2Title}</h3>
            <p className='text-xs text-slate-400 leading-relaxed font-sans'>
              {t.feat2Desc}
            </p>
          </div>

          <div className='p-6 rounded-2xl bg-[#0a0f1d]/80 border border-slate-800 shadow-xl backdrop-blur-md space-y-3 hover:border-slate-700 transition-all'>
            <div className='p-2.5 w-fit rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-400'>
              <Zap className='w-5 h-5' />
            </div>
            <h3 className='text-base font-bold text-white font-sans'>{t.feat3Title}</h3>
            <p className='text-xs text-slate-400 leading-relaxed font-sans'>
              {t.feat3Desc}
            </p>
          </div>
        </section>

        {/* Footer info */}
        <footer className='pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4'>
          <div>{t.footerStatus}</div>
          <div className='flex items-center gap-2 text-emerald-400'>
            <span className='w-2 h-2 rounded-full bg-emerald-400' />
            <span>{t.footerWidgetReady}</span>
          </div>
        </footer>
      </main>

      {/* Floating Chat Widget */}
      <DarkWebChatWidget />
    </div>
  )
}

export default ChatContent
