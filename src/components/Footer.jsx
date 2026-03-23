export default function Footer() {
  return (
    <footer className="py-8">
      {/* Gold gradient separator */}
      <div className="max-w-[200px] mx-auto h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(240, 165, 0, 0.25), transparent)' }} />

      <div className="text-center">
        <p style={{ fontSize: '11px', color: 'rgba(245, 245, 240, 0.18)', fontFamily: "'Cabinet Grotesk', system-ui", letterSpacing: '0.3px' }}>
          <span style={{ color: 'rgba(245, 245, 240, 0.3)' }}>InnoPilot</span> v1.0 · Built by{' '}
          <a
            href="https://alanteixido.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(240, 165, 0, 0.4)',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#f0a500' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240, 165, 0, 0.4)' }}
          >
            @alanteixido
          </a>
        </p>
      </div>
    </footer>
  )
}
