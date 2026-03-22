import { useState } from 'react'
import { motion } from 'framer-motion'

const TIPOS = ['Piso', 'Casa', 'Ático', 'Dúplex', 'Estudio', 'Chalet', 'Local']
const TONOS = ['Profesional', 'Cercano', 'Premium', 'Emocional', 'Directo']

function Chip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 shrink-0"
      style={
        active
          ? {
              background: 'rgba(240, 165, 0, 0.12)',
              border: '1px solid #f0a500',
              color: '#f0a500',
            }
          : {
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.35)',
            }
      }
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = 'rgba(240, 165, 0, 0.5)'
          e.currentTarget.style.color = '#f5f5f0'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.35)'
        }
      }}
    >
      {label}
    </button>
  )
}

export default function PropertyForm({ onGenerate, loading }) {
  const [form, setForm] = useState({
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

  const isValid = form.ubicacion && form.metros

  const labelClass = 'block text-[10px] font-medium uppercase tracking-[2px] mb-3 transition-colors duration-200'
  const labelColor = { color: 'rgba(240, 165, 0, 0.45)', fontFamily: 'Outfit' }
  const inputClass = 'w-full bg-transparent text-sm py-2.5 transition-all duration-200 placeholder:text-zinc-700'
  const inputStyle = { color: '#f5f5f0', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', fontFamily: 'Outfit' }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`relative p-8 sm:p-10 ${loading ? 'form-loading' : ''}`}
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(240, 165, 0, 0.12)',
        borderRadius: '20px',
        boxShadow: '0 0 80px rgba(240, 165, 0, 0.06), 0 32px 64px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* Tipo de propiedad */}
      <div className="mb-7">
        <label className={labelClass} style={labelColor}>Tipo de propiedad</label>
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap">
          {TIPOS.map((t) => (
            <Chip key={t} label={t} active={form.tipo === t} onClick={() => handleChange('tipo', t)} />
          ))}
        </div>
      </div>

      {/* Location & Price */}
      <div className="grid sm:grid-cols-2 gap-6 mb-7">
        <div className="group">
          <label className={labelClass} style={labelColor}>Ubicación *</label>
          <input
            type="text"
            value={form.ubicacion}
            onChange={(e) => handleChange('ubicacion', e.target.value)}
            placeholder="Ej: Eixample, Barcelona"
            className={inputClass}
            style={inputStyle}
            required
          />
        </div>
        <div className="group">
          <label className={labelClass} style={labelColor}>Precio (€)</label>
          <input
            type="number"
            value={form.precio}
            onChange={(e) => handleChange('precio', e.target.value)}
            placeholder="350000"
            className={inputClass}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Rooms, Baths, Sqm */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        <div className="group">
          <label className={labelClass} style={labelColor}>Habitaciones</label>
          <input
            type="number"
            value={form.habitaciones}
            onChange={(e) => handleChange('habitaciones', e.target.value)}
            placeholder="3"
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div className="group">
          <label className={labelClass} style={labelColor}>Baños</label>
          <input
            type="number"
            value={form.banos}
            onChange={(e) => handleChange('banos', e.target.value)}
            placeholder="2"
            className={inputClass}
            style={inputStyle}
          />
        </div>
        <div className="group">
          <label className={labelClass} style={labelColor}>Metros² *</label>
          <input
            type="number"
            value={form.metros}
            onChange={(e) => handleChange('metros', e.target.value)}
            placeholder="95"
            className={inputClass}
            style={inputStyle}
            required
          />
        </div>
      </div>

      {/* Puntos fuertes */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-3">
          <label className={labelClass} style={{ ...labelColor, marginBottom: 0 }}>Puntos fuertes</label>
          <span className="text-[11px] font-mono" style={{ color: charsUsed > maxChars * 0.9 ? '#f0a500' : 'rgba(245, 245, 240, 0.2)' }}>
            {charsUsed}/{maxChars}
          </span>
        </div>
        <textarea
          value={form.puntosFuertes}
          onChange={(e) => handleChange('puntosFuertes', e.target.value)}
          placeholder="Terraza con vistas al mar, cocina reformada, mucha luz natural..."
          rows={3}
          className={`${inputClass} resize-none`}
          style={inputStyle}
        />
        <div className="mt-2 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(charsUsed / maxChars) * 100}%`,
              background: charsUsed > maxChars * 0.9 ? '#ff6b35' : '#f0a500',
            }}
          />
        </div>
      </div>

      {/* Tono */}
      <div className="mb-8">
        <label className={labelClass} style={labelColor}>Tono de comunicación</label>
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap">
          {TONOS.map((t) => (
            <Chip key={t} label={t} active={form.tono === t} onClick={() => handleChange('tono', t)} />
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !isValid}
        className="btn-generate w-full py-4 text-sm"
        style={{ borderRadius: '12px', fontFamily: 'Outfit' }}
      >
        {loading ? 'Claude está generando...' : 'Generar contenido con IA'}
      </button>
    </motion.form>
  )
}
