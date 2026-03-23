import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../lib/AuthContext'
import logo from '../assets/logo1.png'

const spring = { type: 'spring', stiffness: 100, damping: 20 }
const springSnappy = { type: 'spring', stiffness: 300, damping: 30 }

const colors = {
  bg: '#08080a',
  surface: '#111114',
  accent: '#f5a623',
  text: '#f5f5f0',
  textSoft: 'rgba(245, 245, 240, 0.7)',
  textMuted: 'rgba(245, 245, 240, 0.4)',
  textFaint: 'rgba(245, 245, 240, 0.2)',
  border: 'rgba(245, 166, 35, 0.12)',
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

const plans = [
  {
    name: 'Starter',
    price: '0',
    period: '/mes',
    features: ['5 generaciones/mes', '4 canales', 'Copiar y pegar'],
    cta: 'Plan actual',
    highlighted: false,
    plan_id: 'free',
  },
  {
    name: 'Pro',
    price: '19',
    period: '/mes',
    badge: 'Recomendado',
    features: ['100 generaciones/mes', '4 canales', 'Historial de generaciones', 'Tonos personalizados', 'Soporte prioritario'],
    cta: 'Upgrade a Pro',
    highlighted: true,
    plan_id: 'pro',
  },
  {
    name: 'Agency',
    price: '49',
    period: '/mes',
    features: ['Generaciones ilimitadas', '4 canales', 'Historial completo', 'Multi-usuario (hasta 5)', 'API access', 'Soporte dedicado'],
    cta: 'Upgrade a Agency',
    highlighted: false,
    plan_id: 'agency',
  },
]

export default function PricingPage() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(null)

  const currentPlan = profile?.plan || 'free'

  const handleUpgrade = async (planId) => {
    if (!user || planId === 'free' || planId === currentPlan) return
    setLoading(planId)

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId, userId: user.id, email: user.email }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      // silently fail
    }
    setLoading(null)
  }

  return (
    <div style={{
      background: colors.bg,
      minHeight: '100vh',
      fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
      color: colors.text,
      padding: '24px',
    }}>
      {/* Header */}
      <div style={{ maxWidth: 960, margin: '0 auto', marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
          <Link to="/app" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={logo} alt="InnoPilot" style={{ height: 28, width: 28, borderRadius: 6 }} />
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>
              <span style={{ color: colors.text }}>Inno</span>
              <span style={{ color: colors.accent }}>Pilot</span>
            </span>
          </Link>
          <Link
            to="/app"
            style={{
              fontSize: 13,
              color: colors.textMuted,
              textDecoration: 'none',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Volver a la app
          </Link>
        </div>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}
      >
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: colors.accent, marginBottom: 16 }}>
          Planes
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: '0 0 16px',
        }}>
          Elige el plan que necesitas
        </h1>
        <p style={{ color: colors.textMuted, fontSize: 16, lineHeight: 1.6 }}>
          {currentPlan === 'free'
            ? 'Estas en el plan gratuito. Actualiza para generar mas contenido.'
            : `Estas en el plan ${currentPlan}. Gestiona tu suscripcion.`
          }
        </p>
      </motion.div>

      {/* Plans grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        maxWidth: 960,
        margin: '0 auto',
        alignItems: 'stretch',
      }} className="pricing-grid">
        {plans.map((plan) => {
          const isCurrent = plan.plan_id === currentPlan
          const isUpgrade = !isCurrent && plan.plan_id !== 'free'

          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: plans.indexOf(plan) * 0.1 }}
              whileHover={!plan.highlighted ? { y: -4 } : {}}
              style={{
                background: colors.surface,
                borderRadius: 18,
                border: `1px solid ${plan.highlighted ? colors.accent : colors.border}`,
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                position: 'relative',
                ...(plan.highlighted ? {
                  boxShadow: '0 0 60px rgba(245, 166, 35, 0.08), 0 0 120px rgba(245, 166, 35, 0.04)',
                  transform: 'scale(1.03)',
                  zIndex: 2,
                } : {}),
              }}
            >
              {plan.badge && (
                <span style={{
                  position: 'absolute',
                  top: -13,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #f5a623, #f76b1c)',
                  color: '#0a0a0a',
                  fontSize: 11,
                  fontWeight: 800,
                  padding: '5px 18px',
                  borderRadius: 999,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}>
                  {plan.badge}
                </span>
              )}

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colors.textMuted }}>
                    {plan.name}
                  </h3>
                  {isCurrent && (
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#22c55e',
                      background: 'rgba(34, 197, 94, 0.1)',
                      padding: '3px 10px',
                      borderRadius: 6,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                    }}>
                      Actual
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 48, fontWeight: 800, color: colors.text, lineHeight: 1, letterSpacing: '-0.04em' }}>{plan.price}</span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: colors.text }}>EUR</span>
                  <span style={{ fontSize: 14, color: colors.textMuted, marginLeft: 2 }}>{plan.period}</span>
                </div>
              </div>

              <div style={{ height: 1, background: colors.border }} />

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                {plan.features.map((feat) => (
                  <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: colors.textSoft }}>
                    <CheckIcon />
                    {feat}
                  </li>
                ))}
              </ul>

              <motion.button
                onClick={() => isUpgrade ? handleUpgrade(plan.plan_id) : null}
                disabled={isCurrent || loading === plan.plan_id}
                whileHover={isUpgrade ? { scale: 1.02 } : {}}
                whileTap={isUpgrade ? { scale: 0.98 } : {}}
                transition={springSnappy}
                style={{
                  width: '100%',
                  height: 50,
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "'Cabinet Grotesk', system-ui",
                  borderRadius: 14,
                  border: isCurrent ? `1px solid rgba(34, 197, 94, 0.2)` : isUpgrade && plan.highlighted ? 'none' : `1px solid ${colors.border}`,
                  background: isCurrent
                    ? 'rgba(34, 197, 94, 0.06)'
                    : isUpgrade && plan.highlighted
                      ? 'linear-gradient(135deg, #f5a623, #f76b1c)'
                      : isUpgrade
                        ? 'transparent'
                        : 'transparent',
                  color: isCurrent ? '#22c55e' : isUpgrade && plan.highlighted ? '#0a0a0a' : isUpgrade ? colors.text : colors.textMuted,
                  cursor: isCurrent ? 'default' : isUpgrade ? 'pointer' : 'default',
                  opacity: loading === plan.plan_id ? 0.5 : 1,
                  boxShadow: isUpgrade && plan.highlighted ? '0 4px 24px rgba(245, 166, 35, 0.2)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {loading === plan.plan_id
                  ? 'Redirigiendo...'
                  : isCurrent
                    ? 'Plan actual'
                    : plan.cta
                }
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
          .pricing-grid > *:nth-child(2) { transform: none !important; }
        }
      `}</style>
    </div>
  )
}
