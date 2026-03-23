import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../lib/AuthContext'
import { useToast } from '../components/Toast'
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
  green: '#22c55e',
  red: '#ef4444',
  blue: '#3b82f6',
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
      <div style={{ fontSize: 10, fontWeight: 700, color: colors.textFaint, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 10 }}>
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
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function formatRelative(dateStr) {
  if (!dateStr) return '-'
  const diff = Date.now() - new Date(dateStr)
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 60) return `${mins}m`
  if (hours < 24) return `${hours}h`
  if (days < 30) return `${days}d`
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

function ActionBtn({ onClick, color, children, confirm: confirmMsg }) {
  const handleClick = () => {
    if (confirmMsg && !window.confirm(confirmMsg)) return
    onClick()
  }
  return (
    <button
      onClick={handleClick}
      style={{
        background: 'none',
        border: `1px solid ${color}33`,
        color,
        fontSize: 11,
        fontWeight: 700,
        fontFamily: "'Cabinet Grotesk', system-ui",
        padding: '4px 10px',
        borderRadius: 6,
        cursor: 'pointer',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = `${color}15` }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
    >
      {children}
    </button>
  )
}

export default function AdminPage() {
  const { user } = useAuth()
  const toast = useToast()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [viewGens, setViewGens] = useState(null)
  const [gensData, setGensData] = useState([])

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

  const adminAction = async (action, targetUserId, actionData) => {
    const res = await fetch('/api/admin-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, action, targetUserId, data: actionData }),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error)
    return json
  }

  const handleDelete = async (targetId, email) => {
    try {
      await adminAction('delete_user', targetId)
      toast.success(`${email} eliminado`)
      fetchStats()
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleResetUsage = async (targetId, email) => {
    try {
      await adminAction('reset_usage', targetId)
      toast.success(`Uso reseteado para ${email}`)
      fetchStats()
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleStartEdit = (u) => {
    setEditingUser(u.id)
    setEditForm({
      plan: u.plan || 'free',
      generations_limit: u.generations_limit || 5,
      company_name: u.company_name || '',
      company_role: u.company_role || '',
      city: u.city || '',
      phone: u.phone || '',
    })
  }

  const handleSaveEdit = async () => {
    try {
      await adminAction('update_profile', editingUser, editForm)
      toast.success('Usuario actualizado')
      setEditingUser(null)
      fetchStats()
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleViewGens = async (targetId) => {
    if (viewGens === targetId) {
      setViewGens(null)
      return
    }
    try {
      const json = await adminAction('get_generations', targetId)
      setGensData(json.generations || [])
      setViewGens(targetId)
    } catch (err) {
      toast.error(err.message)
    }
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
  const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    color: colors.text,
    fontSize: 13,
    fontFamily: "'Cabinet Grotesk', system-ui",
    padding: '6px 10px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: "'Cabinet Grotesk', system-ui", color: colors.text, padding: 24 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={logo} alt="" style={{ height: 28, width: 28, borderRadius: 6 }} />
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>
              <span style={{ color: colors.text }}>Inno</span>
              <span style={{ color: colors.accent }}>Pilot</span>
            </span>
            <span style={{
              fontSize: 10, fontWeight: 800, color: colors.red,
              background: 'rgba(239, 68, 68, 0.1)', padding: '3px 10px',
              borderRadius: 6, letterSpacing: '1px', textTransform: 'uppercase',
            }}>
              Admin
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={fetchStats} style={{
              background: 'none', border: `1px solid ${colors.border}`,
              color: colors.textMuted, fontSize: 12, fontWeight: 600,
              fontFamily: "'Cabinet Grotesk', system-ui", padding: '6px 14px',
              borderRadius: 8, cursor: 'pointer',
            }}>
              Refrescar
            </button>
            <Link to="/app" style={{ fontSize: 13, color: colors.textMuted, textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              Volver
            </Link>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}
        >
          <StatCard label="Usuarios" value={summary.totalUsers} />
          <StatCard label="Free" value={summary.freeUsers} />
          <StatCard label="Pro" value={summary.proUsers} color={colors.accent} />
          <StatCard label="Agency" value={summary.agencyUsers} color="#f76b1c" />
          <StatCard label="MRR" value={`${summary.mrr}EUR`} color={colors.green} />
          <StatCard label="Generaciones" value={summary.totalGenerations} />
          <StatCard label="Onboarded" value={`${summary.onboarded}/${summary.totalUsers}`} color={colors.blue} />
        </motion.div>

        {/* Users */}
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
          <div style={{ padding: '18px 24px', borderBottom: `1px solid ${colors.border}` }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: colors.accent, letterSpacing: '2px', textTransform: 'uppercase' }}>
              Usuarios ({users.length})
            </span>
          </div>

          {users.map((u) => (
            <div key={u.id}>
              <div
                style={{
                  padding: '14px 24px',
                  borderBottom: `1px solid rgba(255,255,255,0.03)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 34, height: 34, borderRadius: 9,
                  background: 'rgba(245, 166, 35, 0.06)',
                  border: `1px solid ${colors.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, color: colors.accent,
                  flexShrink: 0,
                }}>
                  {u.email?.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>
                    {u.email}
                    {u.id === ADMIN_ID && (
                      <span style={{ fontSize: 9, color: colors.red, marginLeft: 6, fontWeight: 800 }}>TU</span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: colors.textFaint, marginTop: 2, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {u.company_name && <span>{u.company_name}</span>}
                    {u.company_role && <span>/ {u.company_role}</span>}
                    {u.city && <span>/ {u.city}</span>}
                    {u.phone && <span>/ {u.phone}</span>}
                    {!u.company_name && !u.city && <span style={{ fontStyle: 'italic' }}>Sin datos empresa</span>}
                  </div>
                </div>

                {/* Plan badge */}
                <span style={{
                  fontSize: 10, fontWeight: 800, padding: '3px 10px',
                  borderRadius: 6, letterSpacing: '0.5px', textTransform: 'uppercase',
                  ...(u.plan === 'pro' ? { color: colors.accent, background: 'rgba(245, 166, 35, 0.08)' }
                    : u.plan === 'agency' ? { color: '#f76b1c', background: 'rgba(247, 107, 28, 0.08)' }
                    : { color: colors.textFaint, background: 'rgba(255,255,255,0.03)' }),
                }}>
                  {u.plan || 'free'}
                </span>

                {/* Usage */}
                <span style={{ fontSize: 11, color: colors.textMuted, whiteSpace: 'nowrap', minWidth: 50 }}>
                  {u.generations_used || 0}/{u.generations_limit || 5}
                </span>

                {/* Provider */}
                <span style={{ fontSize: 10, fontWeight: 600, color: u.provider === 'google' ? '#4285F4' : colors.textFaint, minWidth: 45 }}>
                  {u.provider}
                </span>

                {/* Last login */}
                <span style={{ fontSize: 11, color: colors.textFaint, minWidth: 30 }}>
                  {formatRelative(u.last_sign_in)}
                </span>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <ActionBtn onClick={() => handleViewGens(u.id)} color={colors.blue}>
                    Gen
                  </ActionBtn>
                  <ActionBtn onClick={() => handleStartEdit(u)} color={colors.accent}>
                    Editar
                  </ActionBtn>
                  <ActionBtn onClick={() => handleResetUsage(u.id, u.email)} color={colors.green} confirm={`Resetear uso de ${u.email}?`}>
                    Reset
                  </ActionBtn>
                  {u.id !== ADMIN_ID && (
                    <ActionBtn onClick={() => handleDelete(u.id, u.email)} color={colors.red} confirm={`ELIMINAR ${u.email}? Esta accion es irreversible.`}>
                      Borrar
                    </ActionBtn>
                  )}
                </div>
              </div>

              {/* Edit form */}
              <AnimatePresence>
                {editingUser === u.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={spring}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '16px 24px 16px 70px',
                      background: 'rgba(245, 166, 35, 0.02)',
                      borderBottom: `1px solid ${colors.border}`,
                      display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap',
                    }}>
                      <div style={{ minWidth: 100 }}>
                        <label style={{ fontSize: 9, color: colors.textFaint, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Plan</label>
                        <select
                          value={editForm.plan}
                          onChange={(e) => setEditForm({ ...editForm, plan: e.target.value })}
                          style={{ ...inputStyle, width: 100 }}
                        >
                          <option value="free">Free</option>
                          <option value="pro">Pro</option>
                          <option value="agency">Agency</option>
                        </select>
                      </div>
                      <div style={{ minWidth: 80 }}>
                        <label style={{ fontSize: 9, color: colors.textFaint, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Limite</label>
                        <input type="number" value={editForm.generations_limit} onChange={(e) => setEditForm({ ...editForm, generations_limit: parseInt(e.target.value) || 5 })} style={{ ...inputStyle, width: 70 }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 120 }}>
                        <label style={{ fontSize: 9, color: colors.textFaint, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Empresa</label>
                        <input value={editForm.company_name} onChange={(e) => setEditForm({ ...editForm, company_name: e.target.value })} style={inputStyle} />
                      </div>
                      <div style={{ minWidth: 100 }}>
                        <label style={{ fontSize: 9, color: colors.textFaint, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Ciudad</label>
                        <input value={editForm.city} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} style={inputStyle} />
                      </div>
                      <div style={{ minWidth: 100 }}>
                        <label style={{ fontSize: 9, color: colors.textFaint, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Telefono</label>
                        <input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} style={inputStyle} />
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={handleSaveEdit} style={{
                          background: colors.accent, border: 'none', color: '#0a0a0a',
                          fontSize: 12, fontWeight: 700, fontFamily: "'Cabinet Grotesk', system-ui",
                          padding: '7px 16px', borderRadius: 8, cursor: 'pointer',
                        }}>
                          Guardar
                        </button>
                        <button onClick={() => setEditingUser(null)} style={{
                          background: 'none', border: `1px solid ${colors.border}`,
                          color: colors.textMuted, fontSize: 12, fontWeight: 600,
                          fontFamily: "'Cabinet Grotesk', system-ui",
                          padding: '7px 12px', borderRadius: 8, cursor: 'pointer',
                        }}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Generations list */}
              <AnimatePresence>
                {viewGens === u.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={spring}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '12px 24px 12px 70px',
                      background: 'rgba(59, 130, 246, 0.02)',
                      borderBottom: `1px solid ${colors.border}`,
                    }}>
                      {gensData.length === 0 ? (
                        <span style={{ fontSize: 12, color: colors.textFaint, fontStyle: 'italic' }}>Sin generaciones</span>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {gensData.map((g) => (
                            <div key={g.id} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 12 }}>
                              <span style={{ color: colors.textFaint, minWidth: 100 }}>{formatDate(g.created_at)}</span>
                              <span style={{ color: colors.textSoft, fontWeight: 600 }}>{g.property_type}</span>
                              <span style={{ color: colors.textMuted }}>{g.location}</span>
                              <span style={{ color: colors.textFaint }}>{g.sqm}m2</span>
                              {g.price && <span style={{ color: colors.textFaint }}>{g.price.toLocaleString()}EUR</span>}
                              <span style={{ color: colors.textFaint }}>{g.tone}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
