export default function Footer() {
  return (
    <footer className="py-8">
      {/* Gold gradient separator */}
      <div className="max-w-[200px] mx-auto h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(240, 165, 0, 0.3), transparent)' }} />

      <div className="text-center">
        <p style={{ fontSize: '11px', color: 'rgba(245, 245, 240, 0.2)', fontFamily: 'Outfit', letterSpacing: '0.5px' }}>
          <span style={{ color: 'rgba(245, 245, 240, 0.35)' }}>InnoPilot</span> v1.0 · Built by <span style={{ color: 'rgba(240, 165, 0, 0.4)' }}>@alanteixido</span>
        </p>
      </div>
    </footer>
  )
}
