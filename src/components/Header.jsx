import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import logo from '../assets/logo1.png'

export default function Header({ genCount }) {
  return (
    <header className="w-full py-6" style={{ borderBottom: '1px solid rgba(240, 165, 0, 0.1)' }}>
      <div className="max-w-[720px] mx-auto px-5 sm:px-6 flex items-center justify-between">
        {/* Left: Back + Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <Link
            to="/"
            style={{
              fontSize: '12px',
              color: 'rgba(240, 165, 0, 0.5)',
              textDecoration: 'none',
              fontFamily: 'Outfit',
              fontWeight: 500,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#f0a500' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240, 165, 0, 0.5)' }}
          >
            &larr; Inicio
          </Link>
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="InnoPilot" style={{ height: 28, width: 28, borderRadius: 5 }} />
            <span className="font-heading" style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.5px', lineHeight: 1 }}>
              <span style={{ color: '#f5f5f0' }}>Inno</span>
              <span style={{ color: '#f0a500' }}>Pilot</span>
            </span>
          </div>
        </motion.div>

        {/* Right side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-5"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#f0a500', animation: 'pulse-dot 2s ease-in-out infinite' }}
            />
            <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(240, 165, 0, 0.6)', fontFamily: 'Outfit', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Conectado
            </span>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(245, 245, 240, 0.25)', fontFamily: 'Outfit' }}>
            {genCount} generacion{genCount !== 1 ? 'es' : ''}
          </span>
        </motion.div>
      </div>
    </header>
  )
}
