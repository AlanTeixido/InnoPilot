import { useState } from 'react'
import { motion } from 'framer-motion'
import ResultCard from './ResultCard'

const TABS = [
  {
    id: 'idealista',
    label: 'Idealista',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 6H11M5 8.5H9M5 11H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11.5" cy="4.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 5L8 9L14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'english',
    label: 'English',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 8H14M8 2C6 4 5.5 6 5.5 8C5.5 10 6 12 8 14M8 2C10 4 10.5 6 10.5 8C10.5 10 10 12 8 14" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
]

export default function ResultsTabs({ results }) {
  const [activeTab, setActiveTab] = useState('idealista')

  return (
    <div>
      {/* AI Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 mb-6"
      >
        <div
          className="w-2 h-2 rounded-full bg-accent"
          style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
        />
        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em]">
          Generado con IA
        </span>
      </motion.div>

      {/* Tab bar */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-6"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
        }}
      >
        {TABS.map((tab, i) => (
          <motion.button
            key={tab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-accent/10 text-accent border border-accent/20'
                : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ResultCard
          channel={TABS.find((t) => t.id === activeTab).label}
          icon={TABS.find((t) => t.id === activeTab).icon}
          content={results[activeTab]}
        />
      </motion.div>
    </div>
  )
}
