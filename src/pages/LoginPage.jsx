import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../lib/AuthContext'
import logo from '../assets/logo1.png'

const colors = {
  bg: '#08080a',
  surface: '#111114',
  accent: '#f5a623',
  accentOrange: '#f76b1c',
  text: '#f5f5f0',
  textSoft: 'rgba(245, 245, 240, 0.7)',
  textMuted: 'rgba(245, 245, 240, 0.4)',
  textFaint: 'rgba(245, 245, 240, 0.2)',
  border: 'rgba(245, 166, 35, 0.12)',
  borderLight: 'rgba(245, 166, 35, 0.08)',
}

const spring = { type: 'spring', stiffness: 100, damping: 20 }
const springSnappy = { type: 'spring', stiffness: 300, damping: 30 }

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)

  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (isSignUp) {
      const { error } = await signUpWithEmail(email, password, fullName)
      if (error) {
        setError(error.message)
      } else {
        setCheckEmail(true)
      }
    } else {
      const { error } = await signInWithEmail(email, password)
      if (error) {
        setError(error.message)
      } else {
        navigate('/app')
      }
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    const { error } = await signInWithGoogle()
    if (error) setError(error.message)
  }

  if (checkEmail) {
    return (
      <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cabinet Grotesk', system-ui, sans-serif" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={spring}
          style={{ textAlign: 'center', padding: 48, maxWidth: 420 }}
        >
          {/* Mail icon */}
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: 'rgba(245, 166, 35, 0.06)',
            border: `1px solid ${colors.borderLight}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 6l10 7 10-7" />
            </svg>
          </div>

          <h2 style={{ color: colors.text, fontFamily: "'Playfair Display', Georgia, serif", marginBottom: 12, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Revisa tu email
          </h2>
          <p style={{ color: colors.textMuted, fontSize: 15, lineHeight: 1.7 }}>
            Hemos enviado un enlace de confirmacion a <strong style={{ color: colors.accent }}>{email}</strong>. Haz click en el enlace para activar tu cuenta.
          </p>
          <Link
            to="/"
            style={{
              color: colors.accent,
              fontSize: 14,
              textDecoration: 'none',
              marginTop: 28,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontWeight: 600,
              transition: 'opacity 0.2s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    )
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
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
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
          maxWidth: 420,
          background: colors.surface,
          borderRadius: 22,
          border: `1px solid ${colors.border}`,
          padding: '44px 40px',
          boxShadow: '0 0 80px rgba(245, 166, 35, 0.03), 0 32px 64px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
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
          </Link>
          <p style={{ color: colors.textMuted, fontSize: 14, marginTop: 14, fontWeight: 500 }}>
            {isSignUp ? 'Crea tu cuenta gratuita' : 'Accede a tu cuenta'}
          </p>
        </div>

        {/* Google button */}
        <motion.button
          onClick={handleGoogle}
          whileHover={{ borderColor: 'rgba(245, 166, 35, 0.3)', background: 'rgba(255, 255, 255, 0.06)' }}
          whileTap={{ scale: 0.98 }}
          transition={springSnappy}
          style={{
            width: '100%',
            padding: '13px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            color: colors.text,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continuar con Google
        </motion.button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '28px 0' }}>
          <div style={{ flex: 1, height: 1, background: colors.border }} />
          <span style={{ color: colors.textFaint, fontSize: 12, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>o</span>
          <div style={{ flex: 1, height: 1, background: colors.border }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <AnimatePresence>
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={spring}
              >
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={inputStyle}
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Contrasena"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
            minLength={6}
          />

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={springSnappy}
                style={{
                  color: '#ef4444',
                  fontSize: 13,
                  margin: 0,
                  padding: '10px 14px',
                  background: 'rgba(239, 68, 68, 0.06)',
                  borderRadius: 10,
                  border: '1px solid rgba(239, 68, 68, 0.12)',
                  fontWeight: 500,
                }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

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
              marginTop: 4,
              letterSpacing: '-0.01em',
            }}
          >
            {loading ? 'Cargando...' : isSignUp ? 'Crear cuenta' : 'Entrar'}
          </motion.button>
        </form>

        {/* Toggle */}
        <p style={{ textAlign: 'center', color: colors.textMuted, fontSize: 14, marginTop: 28, marginBottom: 0 }}>
          {isSignUp ? 'Ya tienes cuenta?' : 'No tienes cuenta?'}{' '}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(null) }}
            style={{
              background: 'none',
              border: 'none',
              color: colors.accent,
              cursor: 'pointer',
              fontWeight: 700,
              fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
              fontSize: 14,
              padding: 0,
              transition: 'opacity 0.2s',
            }}
          >
            {isSignUp ? 'Inicia sesion' : 'Registrate gratis'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}
