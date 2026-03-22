import { motion } from 'framer-motion'

export default function EmptyState() {
  return (
    <div className="dot-grid rounded-2xl p-12 sm:p-16 text-center" style={{ border: '1px solid rgba(255, 255, 255, 0.04)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 4L24 9V19L14 24L4 19V9L14 4Z" stroke="rgba(0,255,136,0.3)" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M14 10V18M10 12L14 10L18 12" stroke="rgba(0,255,136,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-zinc-400 mb-2">
          Listo para generar
        </h3>
        <p className="text-sm text-zinc-600 max-w-xs mx-auto leading-relaxed">
          Rellena el formulario con los datos de tu propiedad y genera contenido profesional para 4 canales al instante.
        </p>

        <div className="flex items-center justify-center gap-6 mt-8">
          {['Idealista', 'Instagram', 'Email', 'English'].map((ch, i) => (
            <motion.span
              key={ch}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-[10px] font-medium text-zinc-700 uppercase tracking-widest"
            >
              {ch}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
