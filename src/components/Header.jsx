import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="w-full border-b border-border py-5">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5"
        >
          {/* Logo mark */}
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="#00ff88" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M8 5V11M5.5 6.5L8 5L10.5 6.5" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Logo text */}
          <span className="text-lg font-bold tracking-tight">
            <span className="text-white">Inno</span>
            <span className="text-accent">Pilot</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
          <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-widest">IA Activa</span>
        </motion.div>
      </div>
    </header>
  )
}
