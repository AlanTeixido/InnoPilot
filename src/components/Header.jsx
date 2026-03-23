import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import logo from '../assets/logo1.png'

export default function Header({ genCount }) {
  const { user, profile, signOut } = useAuth()

  const planLabel = profile?.plan === 'pro' ? 'Pro' : profile?.plan === 'agency' ? 'Agency' : 'Free'
  const usageText = profile ? `${profile.generations_used}/${profile.generations_limit}` : ''

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
          className="flex items-center gap-4"
        >
          {profile && (
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#f0a500', fontFamily: 'Outfit', background: 'rgba(240, 165, 0, 0.1)', padding: '4px 10px', borderRadius: 6 }}>
              {planLabel}
            </span>
          )}
          {usageText && (
            <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(245, 245, 240, 0.3)', fontFamily: 'Outfit' }}>
              {usageText} gen
            </span>
          )}
          <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(245, 245, 240, 0.25)', fontFamily: 'Outfit' }}>
            {genCount} generacion{genCount !== 1 ? 'es' : ''}
          </span>
          {user && (
            <button
              onClick={signOut}
              style={{
                background: 'none',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(245, 245, 240, 0.4)',
                fontSize: '11px',
                fontFamily: 'Outfit',
                fontWeight: 500,
                padding: '4px 12px',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)'; e.currentTarget.style.color = '#ef4444' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = 'rgba(245, 245, 240, 0.4)' }}
            >
              Salir
            </button>
          )}
        </motion.div>
      </div>
    </header>
  )
}
