import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center py-16">
      {/* Orbital spinner */}
      <div className="relative w-16 h-16 mb-6">
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border border-accent/20"
          style={{ animation: 'orbit 3s linear infinite' }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(0,255,136,0.5)]" />
        </div>
        {/* Middle ring */}
        <div
          className="absolute inset-2 rounded-full border border-accent/10"
          style={{ animation: 'orbit 2s linear infinite reverse' }}
        >
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent/60" />
        </div>
        {/* Inner ring */}
        <div
          className="absolute inset-4 rounded-full border border-accent/5"
          style={{ animation: 'orbit 1.5s linear infinite' }}
        >
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent/40" />
        </div>
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-accent/30" />
        </div>
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <p className="text-sm font-medium text-zinc-400 mb-1">Generando contenido</p>
        <div className="flex items-center justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-accent"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
