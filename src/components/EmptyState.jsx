import { motion } from 'framer-motion'

export default function EmptyState() {
  return (
    <div className="dot-grid p-12 sm:p-16 text-center" style={{ border: '1px solid rgba(240, 165, 0, 0.06)', borderRadius: '20px' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(240, 165, 0, 0.05)', border: '1px solid rgba(240, 165, 0, 0.1)' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="4" y="4" width="20" height="20" rx="3" stroke="rgba(240,165,0,0.3)" strokeWidth="1.5" />
            <path d="M10 11H18M10 14.5H15M10 18H12" stroke="rgba(240,165,0,0.3)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        <h3 className="font-heading text-xl mb-2" style={{ color: 'rgba(245, 245, 240, 0.6)', fontWeight: 600 }}>
          Listo para generar
        </h3>
        <p className="text-sm max-w-xs mx-auto leading-relaxed" style={{ color: 'rgba(245, 245, 240, 0.25)', fontFamily: 'Outfit' }}>
          Rellena el formulario con los datos de tu propiedad y genera contenido profesional para 4 canales al instante.
        </p>

        <div className="flex items-center justify-center gap-6 mt-8">
          {['Idealista', 'Instagram', 'Email', 'English'].map((ch, i) => (
            <motion.span
              key={ch}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(240, 165, 0, 0.25)', fontFamily: 'Outfit', letterSpacing: '1.5px', textTransform: 'uppercase' }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
