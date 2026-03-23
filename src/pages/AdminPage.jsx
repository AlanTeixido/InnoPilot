import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../lib/AuthContext'
import logo from '../assets/logo1.png'

const spring = { type: 'spring', stiffness: 100, damping: 20 }

const colors = {
  bg: '#08080a',
  surface: '#111114',
  accent: '#f5a623',
  text: '#f5f5f0',
  textSoft: 'rgba(245, 245, 240, 0.7)',
  textMuted: 'rgba(245, 245, 240, 0.4)',
  textFaint: 'rgba(245, 245, 240, 0.2)',
  border: 'rgba(245, 166, 35, 0.12)',
  green: '#22c55e',
  red: '#ef4444',
}

const ADMIN_ID = '447ff12b-65c7-4eed-941a-9ddc4e5cb620'

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: 16,
      padding: '24px 20px',
      flex: 1,
      minWidth: 120,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: colors.textFaint, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: color || colors.text, letterSpacing: '-0.03em', lineHeight: 1 }}>
        {value}
      </div>
    </div>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function formatRelative(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  const now = new Date()
  const diff = now - d
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 60) return `${mins}m`
  if (hours < 24) return `${hours}h`
  if (days < 30) return `${days}d`
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

export default function AdminPage() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user?.id !== ADMIN_ID) {
      setError('Acceso denegado')
      setLoading(false)
      return
    }
    fetchStats()
  }, [user])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setData(json)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textMuted, fontFamily: "'Cabinet Grotesk', system-ui" }}>
        Cargando panel admin...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ background: colors.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.red, fontFamily: "'Cabinet Grotesk', system-ui" }}>
        {error}
      </div>
    )
  }

  const { summary, users } = data

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: "'Cabinet Grotesk', system-ui", color: colors.text, padding: 24 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={logo} alt="" style={{ height: 28, width: 28, borderRadius: 6 }} />
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>
              <span style={{ color: colors.text }}>Inno</span>
              <span style={{ color: colors.accent }}>Pilot</span>
            </span>
            <span style={{
              fontSize: 10,
              fontWeight: 800,
              color: colors.red,
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '3px 10px',
              borderRadius: 6,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginLeft: 4,
            }}>
              Admin
            </span>
          </div>
          <Link to="/app" style={{ fontSize: 13, color: colors.textMuted, textDecoration: 'none', fontWeight: 600 }}>
            Volver a la app
          </Link>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}
        >
          <StatCard label="Usuarios" value={summary.totalUsers} />
          <StatCard label="Free" value={summary.freeUsers} />
          <StatCard label="Pro" value={summary.proUsers} color={colors.accent} />
          <StatCard label="Agency" value={summary.agencyUsers} color="#f76b1c" />
          <StatCard label="MRR" value={`${summary.mrr}EUR`} color={colors.green} />
          <StatCard label="Generaciones" value={summary.totalGenerations} />
        </motion.div>

        {/* Users table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          style={{
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: 18,
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: colors.accent, letterSpacing: '2px', textTransform: 'uppercase' }}>
              Usuarios ({users.length})
            </span>
            <button
              onClick={fetchStats}
              style={{
                background: 'none',
                border: `1px solid ${colors.border}`,
                color: colors.textMuted,
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "'Cabinet Grotesk', system-ui",
                padding: '5px 12px',
                borderRadius: 8,
                cursor: 'pointer',
              }}
            >
              Refrescar
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                  {['Email', 'Empresa', 'Rol', 'Ciudad', 'Plan', 'Uso', 'Provider', 'Ultimo login', 'Registro'].map((h) => (
                    <th key={h} style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: 10,
                      fontWeight: 700,
                      color: colors.textFaint,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    style={{ borderBottom: `1px solid rgba(255,255,255,0.03)` }}
                  >
                    <td style={{ padding: '12px 16px', color: colors.text, fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {u.email}
                    </td>
                    <td style={{ padding: '12px 16px', color: colors.textSoft, whiteSpace: 'nowrap' }}>
                      {u.company_name || <span style={{ color: colors.textFaint }}>-</span>}
                    </td>
                    <td style={{ padding: '12px 16px', color: colors.textMuted, whiteSpace: 'nowrap' }}>
                      {u.company_role || <span style={{ color: colors.textFaint }}>-</span>}
                    </td>
                    <td style={{ padding: '12px 16px', color: colors.textMuted, whiteSpace: 'nowrap' }}>
                      {u.city || <span style={{ color: colors.textFaint }}>-</span>}
                    </td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: 6,
                        letterSpacing: '0.3px',
                        ...(u.plan === 'pro' ? {
                          color: colors.accent,
                          background: 'rgba(245, 166, 35, 0.08)',
                        } : u.plan === 'agency' ? {
                          color: '#f76b1c',
                          background: 'rgba(247, 107, 28, 0.08)',
                        } : {
                          color: colors.textFaint,
                          background: 'rgba(255, 255, 255, 0.03)',
                        }),
                      }}>
                        {u.plan || 'free'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: colors.textMuted, whiteSpace: 'nowrap' }}>
                      {u.generations_used || 0}/{u.generations_limit || 5}
                    </td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: u.provider === 'google' ? '#4285F4' : colors.textFaint,
                      }}>
                        {u.provider}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: colors.textFaint, whiteSpace: 'nowrap', fontSize: 12 }}>
                      {formatRelative(u.last_sign_in)}
                    </td>
                    <td style={{ padding: '12px 16px', color: colors.textFaint, whiteSpace: 'nowrap', fontSize: 12 }}>
                      {formatDate(u.created_at_auth)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
