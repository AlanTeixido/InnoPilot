import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center py-16">
      {/* Wave dots */}
      <div className="flex items-center gap-2 mb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: '#f0a500',
              animation: `wave 1.2s ease-in-out ${i * 0.15}s infinite`,
              boxShadow: '0 0 8px rgba(240, 165, 0, 0.4)',
            }}
          />
        ))}
      </div>

      {/* Text */}
      <motion.p
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(245, 245, 240, 0.4)', fontFamily: 'Outfit' }}
      >
        Claude está generando...
      </motion.p>
    </div>
  )
}
