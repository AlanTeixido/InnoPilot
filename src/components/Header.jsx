import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import logo from '../assets/logo1.png'

const spring = { type: 'spring', stiffness: 300, damping: 30 }

export default function Header({ genCount }) {
  const { user, profile, signOut } = useAuth()
  const [upgrading, setUpgrading] = useState(false)

  const planLabel = profile?.plan === 'pro' ? 'Pro' : profile?.plan === 'agency' ? 'Agency' : 'Free'
  const usageText = profile ? `${profile.generations_used}/${profile.generations_limit}` : ''
  const isFreePlan = !profile?.plan || profile.plan === 'free'

  const handleUpgrade = async () => {
    if (!user || upgrading) return
    setUpgrading(true)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'pro', userId: user.id, email: user.email }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      // silently fail
    }
    setUpgrading(false)
  }

  const handleManageBilling = async () => {
    if (!user) return
    try {
      const res = await fetch('/api/billing-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      // silently fail
    }
  }

  return (
    <header className="w-full py-5" style={{ borderBottom: '1px solid rgba(240, 165, 0, 0.08)' }}>
      <div className="max-w-[720px] mx-auto px-5 sm:px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring}
          className="flex items-center gap-4"
        >
          <Link
            to="/"
            style={{
              fontSize: '12px',
              color: 'rgba(240, 165, 0, 0.45)',
              textDecoration: 'none',
              fontFamily: "'Cabinet Grotesk', system-ui",
              fontWeight: 600,
              transition: 'color 0.25s ease',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#f0a500' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240, 165, 0, 0.45)' }}
          >
            &larr; Inicio
          </Link>
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="InnoPilot" style={{ height: 26, width: 26, borderRadius: 6 }} />
            <span className="font-heading" style={{ fontWeight: 700, fontSize: '1.4rem', letterSpacing: '-0.03em', lineHeight: 1 }}>
              <span style={{ color: '#f5f5f0' }}>Inno</span>
              <span style={{ color: '#f0a500' }}>Pilot</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring}
          className="flex items-center gap-3"
        >
          {profile && (
            <button
              onClick={isFreePlan ? handleUpgrade : handleManageBilling}
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: isFreePlan ? '#0a0a0a' : '#f0a500',
                fontFamily: "'Cabinet Grotesk', system-ui",
                background: isFreePlan ? 'linear-gradient(135deg, #f5a623, #f76b1c)' : 'rgba(240, 165, 0, 0.08)',
                padding: '5px 14px',
                borderRadius: 8,
                letterSpacing: '0.3px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {isFreePlan ? 'Upgrade' : planLabel}
            </button>
          )}
          {usageText && (
            <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(245, 245, 240, 0.25)', fontFamily: "'Cabinet Grotesk', system-ui" }}>
              {usageText} gen
            </span>
          )}
          <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(245, 245, 240, 0.2)', fontFamily: "'Cabinet Grotesk', system-ui" }}>
            {genCount} generacion{genCount !== 1 ? 'es' : ''}
          </span>
          {user && (
            <button
              onClick={signOut}
              style={{
                background: 'none',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'rgba(245, 245, 240, 0.35)',
                fontSize: '11px',
                fontFamily: "'Cabinet Grotesk', system-ui",
                fontWeight: 600,
                padding: '5px 14px',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)'; e.currentTarget.style.color = '#ef4444' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = 'rgba(245, 245, 240, 0.35)' }}
            >
              Salir
            </button>
          )}
        </motion.div>
      </div>
    </header>
  )
}
