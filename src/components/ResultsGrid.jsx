import { motion } from 'framer-motion'
import ResultCard from './ResultCard'

const CHANNELS = [
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

export default function ResultsGrid({ results }) {
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
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: '#f0a500', animation: 'pulse-dot 2s ease-in-out infinite' }}
        />
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(240, 165, 0, 0.5)', fontFamily: 'Outfit', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Generado por IA
        </span>
      </motion.div>

      {/* 2x2 Grid */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        {CHANNELS.map((ch, i) => (
          <motion.div
            key={ch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <ResultCard
              channel={ch.label}
              icon={ch.icon}
              content={results[ch.id]}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
