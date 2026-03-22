import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center py-16">
      {/* Wave dots */}
      <div className="flex items-center gap-1.5 mb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-accent"
            style={{
              animation: `wave 1.2s ease-in-out ${i * 0.15}s infinite`,
              boxShadow: '0 0 8px rgba(0, 255, 136, 0.4)',
            }}
          />
        ))}
      </div>

      {/* Text */}
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-sm font-medium text-zinc-400"
      >
        Claude está generando...
      </motion.p>
    </div>
  )
}
