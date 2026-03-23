import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../lib/AuthContext'
import { useToast } from '../components/Toast'
import { supabase } from '../lib/supabase'
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

const CHANNELS = [
  { id: 'idealista', label: 'Idealista', color: '#f5a623', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 9.5L12 4l9 5.5" /><path d="M19 13v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6" />
    </svg>
  )},
  { id: 'instagram', label: 'Instagram', color: '#E1306C', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" />
    </svg>
  )},
  { id: 'email', label: 'Email', color: '#3b82f6', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" />
    </svg>
  )},
  { id: 'english', label: 'English', color: '#22c55e', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )},
]

function ChannelCard({ channel, content, active, onClick }) {
  const [copied, setCopied] = useState(false)
  const toast = useToast()

  const handleCopy = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(content)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = content
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    toast.success(`${channel.label} copiado al portapapeles`)
    setTimeout(() => setCopied(false), 2000)
  }

  const wordCount = content?.split(/\s+/).length || 0

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ borderColor: `${channel.color}40` }}
      transition={springSnappy}
      style={{
        background: active ? 'rgba(255,255,255,0.03)' : colors.surface,
        border: `1px solid ${active ? `${channel.color}50` : colors.border}`,
        borderLeft: active ? `3px solid ${channel.color}` : `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: '16px 18px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        transition: 'all 0.2s',
      }}
    >
      <div style={{ color: channel.color, flexShrink: 0 }}>{channel.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: active ? colors.text : colors.textSoft }}>{channel.label}</div>
        <div style={{ fontSize: 11, color: colors.textFaint, marginTop: 2 }}>{wordCount} palabras</div>
      </div>
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={springSnappy}
        style={{
          background: copied ? `${channel.color}15` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${copied ? `${channel.color}40` : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 10,
          padding: '8px 16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          color: copied ? channel.color : colors.textMuted,
          fontSize: 12,
          fontWeight: 700,
          fontFamily: "'Cabinet Grotesk', system-ui",
          flexShrink: 0,
        }}
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
            Copiado
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
            Copiar
          </>
        )}
      </motion.button>
    </motion.div>
  )
}

function MobileCopyButton({ channel, content }) {
  const [copied, setCopied] = useState(false)
  const toast = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = content
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    toast.success(`${channel.label} copiado al portapapeles`)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.97 }}
      style={{
        width: '100%',
        padding: '14px',
        background: copied ? `${channel.color}15` : `${channel.color}10`,
        border: `1px solid ${copied ? `${channel.color}50` : `${channel.color}25`}`,
        borderRadius: 14,
        color: channel.color,
        fontSize: 15,
        fontWeight: 700,
        fontFamily: "'Cabinet Grotesk', system-ui",
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      {copied ? (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
          Copiado
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
          Copiar {channel.label}
        </>
      )}
    </motion.button>
  )
}

export default function ResultsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
  const toast = useToast()
  const [activeChannel, setActiveChannel] = useState('idealista')
  const [results, setResults] = useState(null)
  const [propertyInfo, setPropertyInfo] = useState(null)

  const genId = searchParams.get('id')

  useEffect(() => {
    if (genId && user) {
      loadGeneration(genId)
    } else {
      // Try to load from sessionStorage
      const stored = sessionStorage.getItem('innopilot_results')
      if (stored) {
        const parsed = JSON.parse(stored)
        setResults(parsed.results)
        setPropertyInfo(parsed.property)
      } else {
        navigate('/app')
      }
    }
  }, [genId, user])

  const loadGeneration = async (id) => {
    const { data } = await supabase
      .from('generations')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (data) {
      setResults({
        idealista: data.result_idealista,
        instagram: data.result_instagram,
        email: data.result_email,
        english: data.result_english,
      })
      setPropertyInfo({
        tipo: data.property_type,
        ubicacion: data.location,
        precio: data.price,
        metros: data.sqm,
        habitaciones: data.rooms,
      })
    } else {
      navigate('/app')
    }
  }

  const handleCopyAll = async () => {
    if (!results) return
    const allText = CHANNELS.map((ch) =>
      `--- ${ch.label.toUpperCase()} ---\n\n${results[ch.id]}`
    ).join('\n\n\n')

    try {
      await navigator.clipboard.writeText(allText)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = allText
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    toast.success('Los 4 canales copiados')
  }

  const [regenerating, setRegenerating] = useState(false)

  const handleRegenerate = async () => {
    if (!propertyInfo || regenerating) return
    setRegenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...propertyInfo, userId: user?.id }),
      })
      const data = await response.json()
      if (response.ok) {
        const newResults = {
          idealista: data.idealista,
          instagram: data.instagram,
          email: data.email,
          english: data.english,
        }
        setResults(newResults)
        sessionStorage.setItem('innopilot_results', JSON.stringify({ results: newResults, property: propertyInfo }))
        toast.success('Contenido regenerado')
      } else {
        toast.error(data.error || 'Error al regenerar')
      }
    } catch {
      toast.error('Error de conexion')
    }
    setRegenerating(false)
  }

  if (!results) return null

  const activeContent = results[activeChannel]
  const activeChannelData = CHANNELS.find((c) => c.id === activeChannel)

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: "'Cabinet Grotesk', system-ui", color: colors.text }}>

      {/* Header */}
      <div style={{
        borderBottom: `1px solid ${colors.border}`,
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        background: 'rgba(8, 8, 10, 0.9)',
        backdropFilter: 'blur(20px)',
        zIndex: 10,
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/app')}
            style={{
              background: 'none', border: 'none', color: colors.textMuted,
              cursor: 'pointer', padding: 4, display: 'flex',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <img src={logo} alt="" style={{ height: 24, width: 24, borderRadius: 5 }} />
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em' }}>
            <span style={{ color: colors.text }}>Inno</span>
            <span style={{ color: colors.accent }}>Pilot</span>
          </span>
          {propertyInfo && (
            <span className="property-info-header" style={{ fontSize: 12, color: colors.textFaint, marginLeft: 8 }}>
              {propertyInfo.tipo} en {propertyInfo.ubicacion} &middot; {propertyInfo.metros}m2
              {propertyInfo.precio ? ` &middot; ${Number(propertyInfo.precio).toLocaleString('es-ES')}EUR` : ''}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <motion.button
            onClick={handleCopyAll}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springSnappy}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              padding: '8px 16px',
              color: colors.textSoft,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "'Cabinet Grotesk', system-ui",
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span className="btn-label">Copiar todo</span>
          </motion.button>
          <motion.button
            onClick={handleRegenerate}
            disabled={regenerating}
            whileHover={!regenerating ? { scale: 1.02 } : {}}
            whileTap={!regenerating ? { scale: 0.98 } : {}}
            transition={springSnappy}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              padding: '8px 16px',
              color: regenerating ? colors.textFaint : colors.textSoft,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "'Cabinet Grotesk', system-ui",
              cursor: regenerating ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ animation: regenerating ? 'spin 1s linear infinite' : 'none' }}>
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
            <span className="btn-label">{regenerating ? 'Regenerando...' : 'Regenerar'}</span>
          </motion.button>
          <motion.button
            onClick={() => navigate('/app')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={springSnappy}
            style={{
              background: 'linear-gradient(135deg, #f5a623, #f76b1c)',
              border: 'none',
              borderRadius: 10,
              padding: '8px 20px',
              color: '#0a0a0a',
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "'Cabinet Grotesk', system-ui",
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 12px rgba(245, 166, 35, 0.2)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span className="btn-label">Nueva</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="mobile-tabs" style={{
        display: 'none',
        overflowX: 'auto',
        padding: '12px 16px',
        gap: 6,
        borderBottom: `1px solid ${colors.border}`,
      }}>
        {CHANNELS.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActiveChannel(ch.id)}
            style={{
              background: activeChannel === ch.id ? `${ch.color}15` : 'transparent',
              border: `1px solid ${activeChannel === ch.id ? `${ch.color}40` : colors.border}`,
              borderRadius: 10,
              padding: '8px 16px',
              color: activeChannel === ch.id ? ch.color : colors.textMuted,
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "'Cabinet Grotesk', system-ui",
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              flexShrink: 0,
            }}
          >
            {ch.icon}
            {ch.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 57px)' }}>

        {/* Sidebar - channel list */}
        <div style={{
          width: 320,
          borderRight: `1px solid ${colors.border}`,
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          flexShrink: 0,
        }} className="results-sidebar">
          <p style={{ fontSize: 10, fontWeight: 700, color: colors.textFaint, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 8px 4px' }}>
            Canales generados
          </p>
          {CHANNELS.map((ch) => (
            <ChannelCard
              key={ch.id}
              channel={ch}
              content={results[ch.id]}
              active={activeChannel === ch.id}
              onClick={() => setActiveChannel(ch.id)}
            />
          ))}
        </div>

        {/* Main content - active channel */}
        <div style={{ flex: 1, padding: '32px 48px', maxWidth: 800, overflow: 'auto' }} className="results-content">
          <motion.div
            key={activeChannel}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            {/* Channel header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${activeChannelData.color}12`,
                border: `1px solid ${activeChannelData.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: activeChannelData.color,
              }}>
                {activeChannelData.icon}
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>
                  {activeChannelData.label}
                </h2>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: colors.textFaint }}>
                  {activeContent?.split(/\s+/).length || 0} palabras &middot; Generado con IA
                </p>
              </div>
            </div>

            {/* Content */}
            <div style={{
              fontSize: 15,
              lineHeight: 1.85,
              color: colors.textSoft,
              whiteSpace: 'pre-wrap',
              letterSpacing: '-0.01em',
            }}>
              {activeContent}
            </div>

            {/* Mobile copy button */}
            <div className="mobile-copy-btn" style={{ display: 'none', marginTop: 32 }}>
              <MobileCopyButton channel={activeChannelData} content={activeContent} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .results-sidebar { display: none !important; }
          .results-content { padding: 24px 20px !important; }
          .mobile-tabs { display: flex !important; }
          .property-info-header { display: none !important; }
          .btn-label { display: none !important; }
          .mobile-copy-btn { display: block !important; }
        }
      `}</style>
    </div>
  )
}
