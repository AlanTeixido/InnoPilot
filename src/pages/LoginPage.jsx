import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../lib/AuthContext'
import logo from '../assets/logo1.png'

const colors = {
  bg: '#08080a',
  surface: '#111114',
  accent: '#f5a623',
  text: '#f5f5f0',
  textMuted: 'rgba(245, 245, 240, 0.4)',
  border: 'rgba(245, 166, 35, 0.15)',
}

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
      <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', system-ui, sans-serif" }}>
        <div style={{ textAlign: 'center', padding: 40, maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>✉️</div>
          <h2 style={{ color: colors.text, fontFamily: "'Playfair Display', Georgia, serif", marginBottom: 12 }}>Revisa tu email</h2>
          <p style={{ color: colors.textMuted, fontSize: 15, lineHeight: 1.7 }}>
            Hemos enviado un enlace de confirmación a <strong style={{ color: colors.accent }}>{email}</strong>. Haz click en el enlace para activar tu cuenta.
          </p>
          <Link to="/" style={{ color: colors.accent, fontSize: 14, textDecoration: 'none', marginTop: 24, display: 'inline-block' }}>
            &larr; Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: `1px solid ${colors.border}`,
    borderRadius: 10,
    color: colors.text,
    fontSize: 15,
    fontFamily: "'Outfit', system-ui, sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', system-ui, sans-serif", padding: 24 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: 420,
          background: colors.surface,
          borderRadius: 20,
          border: `1px solid ${colors.border}`,
          padding: 40,
          boxShadow: '0 0 80px rgba(245, 166, 35, 0.04), 0 32px 64px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <img src={logo} alt="InnoPilot" style={{ height: 32, width: 32, borderRadius: 6 }} />
            <span style={{ fontSize: 22, fontWeight: 700 }}>
              <span style={{ color: colors.text }}>Inno</span>
              <span style={{ color: '#f0a500' }}>Pilot</span>
            </span>
          </Link>
          <p style={{ color: colors.textMuted, fontSize: 14, marginTop: 12 }}>
            {isSignUp ? 'Crea tu cuenta gratuita' : 'Accede a tu cuenta'}
          </p>
        </div>

        {/* Google button */}
        <button
          onClick={handleGoogle}
          style={{
            width: '100%',
            padding: '14px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${colors.border}`,
            borderRadius: 10,
            color: colors.text,
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: "'Outfit', system-ui, sans-serif",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continuar con Google
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: colors.border }} />
          <span style={{ color: colors.textMuted, fontSize: 13 }}>o</span>
          <div style={{ flex: 1, height: 1, background: colors.border }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Nombre completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={inputStyle}
              required
            />
          )}
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
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
            minLength={6}
          />

          {error && (
            <p style={{ color: '#ef4444', fontSize: 13, margin: 0, padding: '8px 12px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: 8 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #f5a623, #f76b1c)',
              border: 'none',
              borderRadius: 10,
              color: '#000000',
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Outfit', system-ui, sans-serif",
              opacity: loading ? 0.6 : 1,
              boxShadow: '0 4px 20px rgba(245, 166, 35, 0.3)',
              transition: 'opacity 0.2s ease',
            }}
          >
            {loading ? 'Cargando...' : isSignUp ? 'Crear cuenta' : 'Entrar'}
          </button>
        </form>

        {/* Toggle */}
        <p style={{ textAlign: 'center', color: colors.textMuted, fontSize: 14, marginTop: 24, marginBottom: 0 }}>
          {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(null) }}
            style={{
              background: 'none',
              border: 'none',
              color: colors.accent,
              cursor: 'pointer',
              fontWeight: 600,
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: 14,
              padding: 0,
            }}
          >
            {isSignUp ? 'Inicia sesión' : 'Regístrate gratis'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}
