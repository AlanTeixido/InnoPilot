import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../lib/AuthContext'
import { supabase } from '../lib/supabase'
import logo from '../assets/logo1.png'

const spring = { type: 'spring', stiffness: 100, damping: 20 }
const springSnappy = { type: 'spring', stiffness: 300, damping: 30 }

const colors = {
  bg: '#08080a',
  surface: '#111114',
  accent: '#f5a623',
  text: '#f5f5f0',
  textMuted: 'rgba(245, 245, 240, 0.4)',
  textFaint: 'rgba(245, 245, 240, 0.2)',
  border: 'rgba(245, 166, 35, 0.12)',
}

const ROLES = ['Agente inmobiliario', 'Director de agencia', 'Marketing inmobiliario', 'Promotor', 'Propietario particular', 'Otro']

export default function OnboardingPage() {
  const { user, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    company_name: '',
    company_role: '',
    phone: '',
    city: '',
  })

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)

    const { error } = await supabase
      .from('profiles')
      .update({
        company_name: form.company_name || null,
        company_role: form.company_role || null,
        phone: form.phone || null,
        city: form.city || null,
        onboarding_completed: true,
      })
      .eq('id', user.id)

    if (error) {
      setLoading(false)
      return
    }

    await refreshProfile()
    setLoading(false)
    navigate('/app', { replace: true })
  }

  const handleSkip = async () => {
    if (!user) return
    const { error } = await supabase
      .from('profiles')
      .update({ onboarding_completed: true })
      .eq('id', user.id)

    if (error) return

    await refreshProfile()
    navigate('/app', { replace: true })
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255, 255, 255, 0.025)',
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    color: colors.text,
    fontSize: 15,
    fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
    outline: 'none',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box',
    letterSpacing: '-0.01em',
  }

  return (
    <div style={{
      background: colors.bg,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 166, 35, 0.06) 0%, transparent 70%)',
        filter: 'blur(80px)',
        top: '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
        style={{
          width: '100%',
          maxWidth: 480,
          background: colors.surface,
          borderRadius: 22,
          border: `1px solid ${colors.border}`,
          padding: '44px 40px',
          boxShadow: '0 0 80px rgba(245, 166, 35, 0.03), 0 32px 64px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <img src={logo} alt="InnoPilot" style={{ height: 30, width: 30, borderRadius: 7 }} />
            <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.03em' }}>
              <span style={{ color: colors.text }}>Inno</span>
              <span style={{
                background: 'linear-gradient(135deg, #f5a623, #f76b1c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Pilot</span>
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 24,
            fontWeight: 700,
            color: colors.text,
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
          }}>
            Cuentanos sobre ti
          </h2>
          <p style={{ color: colors.textMuted, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            Esto nos ayuda a personalizar tu experiencia
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Company name */}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: colors.textFaint, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>
              Empresa / Agencia
            </label>
            <input
              type="text"
              placeholder="Ej: Fincas Martinez"
              value={form.company_name}
              onChange={(e) => handleChange('company_name', e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Role */}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: colors.textFaint, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>
              Tu rol
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ROLES.map((role) => (
                <motion.button
                  key={role}
                  type="button"
                  onClick={() => handleChange('company_role', role)}
                  whileHover={{ borderColor: 'rgba(245, 166, 35, 0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={springSnappy}
                  style={{
                    padding: '8px 14px',
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Cabinet Grotesk', system-ui",
                    borderRadius: 10,
                    border: `1px solid ${form.company_role === role ? colors.accent : colors.border}`,
                    background: form.company_role === role ? 'rgba(245, 166, 35, 0.08)' : 'transparent',
                    color: form.company_role === role ? colors.accent : colors.textMuted,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {role}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: colors.textFaint, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>
              Telefono
            </label>
            <input
              type="tel"
              placeholder="+34 612 345 678"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* City */}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: colors.textFaint, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>
              Ciudad
            </label>
            <input
              type="text"
              placeholder="Ej: Barcelona"
              value={form.city}
              onChange={(e) => handleChange('city', e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.01, boxShadow: '0 8px 32px rgba(245, 166, 35, 0.35)' } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            transition={springSnappy}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #f5a623, #f76b1c)',
              border: 'none',
              borderRadius: 12,
              color: '#0a0a0a',
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
              opacity: loading ? 0.5 : 1,
              boxShadow: '0 4px 20px rgba(245, 166, 35, 0.25)',
              marginTop: 8,
            }}
          >
            {loading ? 'Guardando...' : 'Continuar'}
          </motion.button>
        </form>

        {/* Skip */}
        <button
          onClick={handleSkip}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'center',
            background: 'none',
            border: 'none',
            color: colors.textFaint,
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "'Cabinet Grotesk', system-ui",
            cursor: 'pointer',
            marginTop: 16,
            padding: 8,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = colors.textMuted }}
          onMouseLeave={(e) => { e.currentTarget.style.color = colors.textFaint }}
        >
          Saltar por ahora
        </button>
      </motion.div>
    </div>
  )
}
