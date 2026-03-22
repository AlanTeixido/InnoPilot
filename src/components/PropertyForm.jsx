import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineKey, HiOutlineLocationMarker, HiOutlineCurrencyEuro, HiOutlineHome } from 'react-icons/hi'

const TIPOS = ['Piso', 'Casa', 'Ático', 'Dúplex', 'Estudio', 'Chalet', 'Local']
const TONOS = ['Profesional', 'Cercano', 'Premium', 'Emocional', 'Directo']

export default function PropertyForm({ onGenerate, loading }) {
  const [form, setForm] = useState({
    apiKey: '',
    tipo: 'Piso',
    ubicacion: '',
    precio: '',
    habitaciones: '',
    banos: '',
    metros: '',
    puntosFuertes: '',
    tono: 'Profesional',
  })

  const maxChars = 500
  const charsUsed = form.puntosFuertes.length

  const handleChange = (field, value) => {
    if (field === 'puntosFuertes' && value.length > maxChars) return
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate(form)
  }

  const isValid = form.apiKey && form.ubicacion && form.precio

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative rounded-2xl p-6 sm:p-8"
      style={{
        background: 'rgba(17, 17, 17, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03)',
      }}
    >
      {/* API Key */}
      <div className="mb-8 pb-6" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <label className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-3">
          <HiOutlineKey className="text-accent text-sm" />
          API Key de Anthropic
        </label>
        <input
          type="password"
          value={form.apiKey}
          onChange={(e) => handleChange('apiKey', e.target.value)}
          placeholder="sk-ant-..."
          className="w-full bg-transparent text-white text-sm py-2.5 border-b border-zinc-800 hover:border-zinc-600 transition-colors placeholder:text-zinc-700"
          required
        />
      </div>

      {/* Tipo de propiedad - Chips */}
      <div className="mb-7">
        <label className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-3">
          <HiOutlineHome className="text-accent text-sm" />
          Tipo de propiedad
        </label>
        <div className="flex flex-wrap gap-2">
          {TIPOS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleChange('tipo', t)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                form.tipo === t
                  ? 'bg-accent/15 text-accent border border-accent/30 shadow-[0_0_15px_rgba(0,255,136,0.1)]'
                  : 'bg-surface-2 text-zinc-500 border border-border hover:border-zinc-600 hover:text-zinc-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Location & Price */}
      <div className="grid sm:grid-cols-2 gap-6 mb-7">
        <div>
          <label className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-3">
            <HiOutlineLocationMarker className="text-accent text-sm" />
            Ubicación
          </label>
          <input
            type="text"
            value={form.ubicacion}
            onChange={(e) => handleChange('ubicacion', e.target.value)}
            placeholder="Ej: Eixample, Barcelona"
            className="w-full bg-transparent text-white text-sm py-2.5 border-b border-zinc-800 hover:border-zinc-600 transition-colors placeholder:text-zinc-700"
            required
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-3">
            <HiOutlineCurrencyEuro className="text-accent text-sm" />
            Precio (€)
          </label>
          <input
            type="number"
            value={form.precio}
            onChange={(e) => handleChange('precio', e.target.value)}
            placeholder="350000"
            className="w-full bg-transparent text-white text-sm py-2.5 border-b border-zinc-800 hover:border-zinc-600 transition-colors placeholder:text-zinc-700"
            required
          />
        </div>
      </div>

      {/* Rooms, Baths, Sqm */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        <div>
          <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-3 block">
            Habitaciones
          </label>
          <input
            type="number"
            value={form.habitaciones}
            onChange={(e) => handleChange('habitaciones', e.target.value)}
            placeholder="3"
            className="w-full bg-transparent text-white text-sm py-2.5 border-b border-zinc-800 hover:border-zinc-600 transition-colors placeholder:text-zinc-700"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-3 block">
            Baños
          </label>
          <input
            type="number"
            value={form.banos}
            onChange={(e) => handleChange('banos', e.target.value)}
            placeholder="2"
            className="w-full bg-transparent text-white text-sm py-2.5 border-b border-zinc-800 hover:border-zinc-600 transition-colors placeholder:text-zinc-700"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-3 block">
            Metros²
          </label>
          <input
            type="number"
            value={form.metros}
            onChange={(e) => handleChange('metros', e.target.value)}
            placeholder="95"
            className="w-full bg-transparent text-white text-sm py-2.5 border-b border-zinc-800 hover:border-zinc-600 transition-colors placeholder:text-zinc-700"
          />
        </div>
      </div>

      {/* Puntos fuertes */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-3">
          <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em]">
            Puntos fuertes
          </label>
          <span className={`text-[11px] font-mono ${charsUsed > maxChars * 0.9 ? 'text-amber-400' : 'text-zinc-600'}`}>
            {charsUsed}/{maxChars}
          </span>
        </div>
        <textarea
          value={form.puntosFuertes}
          onChange={(e) => handleChange('puntosFuertes', e.target.value)}
          placeholder="Terraza con vistas al mar, cocina reformada, mucha luz natural..."
          rows={3}
          className="w-full bg-transparent text-white text-sm py-2.5 border-b border-zinc-800 hover:border-zinc-600 transition-colors placeholder:text-zinc-700 resize-none"
        />
        {/* Character bar */}
        <div className="mt-2 h-0.5 bg-zinc-900 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(charsUsed / maxChars) * 100}%`,
              background: charsUsed > maxChars * 0.9 ? '#f59e0b' : '#00ff88',
            }}
          />
        </div>
      </div>

      {/* Tono - Chips */}
      <div className="mb-8">
        <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-3 block">
          Tono de comunicación
        </label>
        <div className="flex flex-wrap gap-2">
          {TONOS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleChange('tono', t)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                form.tono === t
                  ? 'bg-accent/15 text-accent border border-accent/30 shadow-[0_0_15px_rgba(0,255,136,0.1)]'
                  : 'bg-surface-2 text-zinc-500 border border-border hover:border-zinc-600 hover:text-zinc-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !isValid}
        className={`w-full py-4 rounded-xl text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
          loading || !isValid
            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
            : 'shimmer-btn text-black cursor-pointer'
        }`}
      >
        {loading ? 'Generando contenido...' : 'Generar contenido con IA'}
      </button>
    </motion.form>
  )
}
