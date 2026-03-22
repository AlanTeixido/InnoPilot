export default function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-zinc-600 tracking-wide">
          © 2026 <span className="text-zinc-400">InnoPilot</span>. Contenido generado con IA.
        </p>
        <p className="text-[11px] text-zinc-700 tracking-wide">
          Powered by Claude API
        </p>
      </div>
    </footer>
  )
}
