import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineLocationMarker, HiOutlineCurrencyEuro, HiOutlineHome } from 'react-icons/hi'

const TIPOS = ['Piso', 'Casa', 'Ático', 'Dúplex', 'Estudio', 'Chalet', 'Local']
const TONOS = ['Profesional', 'Cercano', 'Premium', 'Emocional', 'Directo']

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

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`relative rounded-2xl p-6 sm:p-8 ${loading ? 'form-loading' : ''}`}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        boxShadow: '0 0 0 1px rgba(0, 255, 136, 0.05), 0 32px 64px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Tipo de propiedad */}
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
              className="px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200"
              style={
                form.tipo === t
                  ? {
                      background: 'rgba(0, 255, 136, 0.15)',
                      border: '1px solid #00ff88',
                      color: '#00ff88',
                      boxShadow: '0 0 15px rgba(0, 255, 136, 0.1)',
                    }
                  : {
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.4)',
                    }
              }
              onMouseEnter={(e) => {
                if (form.tipo !== t) {
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.4)'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.background = 'rgba(0, 255, 136, 0.05)'
                }
              }}
              onMouseLeave={(e) => {
                if (form.tipo !== t) {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Location & Price */}
      <div className="grid sm:grid-cols-2 gap-6 mb-7">
        <div className="group">
          <label className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-3 group-focus-within:text-accent transition-colors duration-200">
            <HiOutlineLocationMarker className="text-accent text-sm" />
            Ubicación *
          </label>
          <input
            type="text"
            value={form.ubicacion}
            onChange={(e) => handleChange('ubicacion', e.target.value)}
            placeholder="Ej: Eixample, Barcelona"
            className="w-full bg-transparent text-white text-sm py-2.5 border-b border-zinc-800 hover:border-zinc-600 transition-all duration-200 placeholder:text-zinc-700"
            required
          />
        </div>
        <div className="group">
          <label className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-3 group-focus-within:text-accent transition-colors duration-200">
            <HiOutlineCurrencyEuro className="text-accent text-sm" />
            Precio (€)
          </label>
          <input
            type="number"
            value={form.precio}
            onChange={(e) => handleChange('precio', e.target.value)}
            placeholder="350000"
            className="w-full bg-transparent text-white text-sm py-2.5 border-b border-zinc-800 hover:border-zinc-600 transition-all duration-200 placeholder:text-zinc-700"
          />
        </div>
      </div>

      {/* Rooms, Baths, Sqm */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        <div className="group">
          <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-3 block group-focus-within:text-accent transition-colors duration-200">
            Habitaciones
          </label>
          <input
            type="number"
            value={form.habitaciones}
            onChange={(e) => handleChange('habitaciones', e.target.value)}
            placeholder="3"
            className="w-full bg-transparent text-white text-sm py-2.5 border-b border-zinc-800 hover:border-zinc-600 transition-all duration-200 placeholder:text-zinc-700"
          />
        </div>
        <div className="group">
          <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-3 block group-focus-within:text-accent transition-colors duration-200">
            Baños
          </label>
          <input
            type="number"
            value={form.banos}
            onChange={(e) => handleChange('banos', e.target.value)}
            placeholder="2"
            className="w-full bg-transparent text-white text-sm py-2.5 border-b border-zinc-800 hover:border-zinc-600 transition-all duration-200 placeholder:text-zinc-700"
          />
        </div>
        <div className="group">
          <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] mb-3 block group-focus-within:text-accent transition-colors duration-200">
            Metros² *
          </label>
          <input
            type="number"
            value={form.metros}
            onChange={(e) => handleChange('metros', e.target.value)}
            placeholder="95"
            className="w-full bg-transparent text-white text-sm py-2.5 border-b border-zinc-800 hover:border-zinc-600 transition-all duration-200 placeholder:text-zinc-700"
            required
          />
        </div>
      </div>

      {/* Puntos fuertes */}
      <div className="mb-7 group">
        <div className="flex items-center justify-between mb-3">
          <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.15em] group-focus-within:text-accent transition-colors duration-200">
            Puntos fuertes
          </label>
          <span className={`text-[11px] font-mono transition-colors duration-200 ${charsUsed > maxChars * 0.9 ? 'text-amber-400' : 'text-zinc-600'}`}>
            {charsUsed}/{maxChars}
          </span>
        </div>
        <textarea
          value={form.puntosFuertes}
          onChange={(e) => handleChange('puntosFuertes', e.target.value)}
          placeholder="Terraza con vistas al mar, cocina reformada, mucha luz natural..."
          rows={3}
          className="w-full bg-transparent text-white text-sm py-2.5 border-b border-zinc-800 hover:border-zinc-600 transition-all duration-200 placeholder:text-zinc-700 resize-none"
        />
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

      {/* Tono */}
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
              className="px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200"
              style={
                form.tono === t
                  ? {
                      background: 'rgba(0, 255, 136, 0.15)',
                      border: '1px solid #00ff88',
                      color: '#00ff88',
                      boxShadow: '0 0 15px rgba(0, 255, 136, 0.1)',
                    }
                  : {
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.4)',
                    }
              }
              onMouseEnter={(e) => {
                if (form.tono !== t) {
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.4)'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.background = 'rgba(0, 255, 136, 0.05)'
                }
              }}
              onMouseLeave={(e) => {
                if (form.tono !== t) {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
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
            ? 'bg-zinc-800/60 text-zinc-600 cursor-not-allowed'
            : 'shimmer-btn text-black cursor-pointer'
        }`}
      >
        {loading ? 'Claude está generando...' : 'Generar contenido con IA'}
      </button>
    </motion.form>
  )
}
