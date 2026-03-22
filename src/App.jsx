import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import PropertyForm from './components/PropertyForm'
import ResultsTabs from './components/ResultsTabs'
import EmptyState from './components/EmptyState'
import LoadingSpinner from './components/LoadingSpinner'
import Footer from './components/Footer'

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerate = async (formData) => {
    setLoading(true)
    setError(null)
    setResults(null)

    const prompt = `Eres un experto copywriter inmobiliario. Genera contenido de marketing para esta propiedad:

Tipo: ${formData.tipo}
Ubicación: ${formData.ubicacion}
Precio: ${formData.precio}€
Habitaciones: ${formData.habitaciones}
Baños: ${formData.banos}
Metros cuadrados: ${formData.metros}m²
Puntos fuertes: ${formData.puntosFuertes}
Tono: ${formData.tono}

Genera EXACTAMENTE 4 bloques de texto separados por "---SEPARATOR---":

1. IDEALISTA: Descripción profesional para portal inmobiliario (150-250 palabras). Formal pero atractivo.

2. INSTAGRAM: Caption para Instagram con emojis, hashtags relevantes y call to action. Máx 2200 caracteres.

3. EMAIL: Email de marketing para enviar a potenciales compradores. Incluye asunto, saludo, cuerpo y cierre. Profesional y persuasivo.

4. ENGLISH: Professional property listing in English for international buyers (150-250 words).

Responde SOLO con los 4 textos separados por "---SEPARATOR---", sin numerar ni añadir etiquetas.`

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': formData.apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4096,
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.error?.message || `Error ${response.status}`)
      }

      const data = await response.json()
      const text = data.content[0].text
      const parts = text.split('---SEPARATOR---').map((p) => p.trim())

      if (parts.length >= 4) {
        setResults({
          idealista: parts[0],
          instagram: parts[1],
          email: parts[2],
          english: parts[3],
        })
      } else {
        throw new Error('Formato de respuesta inesperado')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-[720px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <PropertyForm onGenerate={handleGenerate} loading={loading} />

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 p-4 rounded-lg border border-red-500/20 bg-red-500/5"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12"
            >
              <LoadingSpinner />
            </motion.div>
          )}

          {!loading && !results && !error && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12"
            >
              <EmptyState />
            </motion.div>
          )}

          {results && !loading && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-10"
            >
              <ResultsTabs results={results} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default App
