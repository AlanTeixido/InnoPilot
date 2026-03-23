import { motion } from 'framer-motion'

const springSnappy = { type: 'spring', stiffness: 300, damping: 30 }

function formatDate(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const diff = now - d
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (mins < 1) return 'Ahora mismo'
  if (mins < 60) return `Hace ${mins} min`
  if (hours < 24) return `Hace ${hours}h`
  if (days < 7) return `Hace ${days}d`
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

export default function HistoryPanel({ history, onSelect, onClose }) {
  return (
    <div
      style={{
        background: '#111114',
        border: '1px solid rgba(245, 166, 35, 0.12)',
        borderRadius: 18,
        padding: '20px',
        maxHeight: 320,
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#f5a623',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontFamily: "'Cabinet Grotesk', system-ui",
        }}>
          Historial
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(245, 245, 240, 0.25)',
            cursor: 'pointer',
            padding: 4,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {history.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onSelect(item)}
            whileHover={{ backgroundColor: 'rgba(245, 166, 35, 0.04)', borderColor: 'rgba(245, 166, 35, 0.2)' }}
            transition={springSnappy}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 12,
              padding: '12px 14px',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              width: '100%',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#f5f5f0',
                fontFamily: "'Cabinet Grotesk', system-ui",
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {item.property_type} en {item.location}
              </div>
              <div style={{
                fontSize: 11,
                color: 'rgba(245, 245, 240, 0.25)',
                fontFamily: "'Cabinet Grotesk', system-ui",
                marginTop: 3,
                display: 'flex',
                gap: 8,
              }}>
                <span>{item.sqm}m2</span>
                {item.rooms && <span>{item.rooms} hab</span>}
                {item.price && <span>{item.price.toLocaleString('es-ES')}EUR</span>}
              </div>
            </div>
            <span style={{
              fontSize: 10,
              color: 'rgba(245, 245, 240, 0.2)',
              fontFamily: "'Cabinet Grotesk', system-ui",
              fontWeight: 500,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              {formatDate(item.created_at)}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
