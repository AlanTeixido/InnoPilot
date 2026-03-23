import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import PropertyForm from './components/PropertyForm'
import ResultsGrid from './components/ResultsGrid'
import EmptyState from './components/EmptyState'
import LoadingSpinner from './components/LoadingSpinner'
import HistoryPanel from './components/HistoryPanel'
import Footer from './components/Footer'
import { useAuth } from './lib/AuthContext'
import { useToast } from './components/Toast'
import { supabase } from './lib/supabase'

const spring = { type: 'spring', stiffness: 100, damping: 20 }
const springSnappy = { type: 'spring', stiffness: 300, damping: 30 }

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [genCount, setGenCount] = useState(0)
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const { user, profile, refreshProfile } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  // Check for upgrade success
  useEffect(() => {
    if (searchParams.get('upgraded') === 'true') {
      toast.success('Plan actualizado correctamente')
      setSearchParams({}, { replace: true })
      refreshProfile()
    }
  }, [])

  // Load history on mount
  useEffect(() => {
    if (user) loadHistory()
  }, [user])

  const loadHistory = async () => {
    if (!user) return
    const { data } = await supabase
      .from('generations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)
    if (data) setHistory(data)
  }

  const saveGeneration = async (formData, resultData) => {
    if (!user) return
    await supabase.from('generations').insert({
      user_id: user.id,
      property_type: formData.tipo,
      location: formData.ubicacion,
      price: formData.precio ? parseInt(formData.precio) : null,
      rooms: formData.habitaciones ? parseInt(formData.habitaciones) : null,
      bathrooms: formData.banos ? parseInt(formData.banos) : null,
      sqm: parseInt(formData.metros),
      highlights: formData.puntosFuertes || null,
      tone: formData.tono,
      result_idealista: resultData.idealista,
      result_instagram: resultData.instagram,
      result_email: resultData.email,
      result_english: resultData.english,
    })
    loadHistory()
  }

  const handleGenerate = async (formData) => {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: user?.id }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.limit_reached) {
          toast.error('Limite alcanzado. Redirigiendo a planes...')
          setTimeout(() => navigate('/pricing'), 1500)
        }
        throw new Error(data.error || `Error ${response.status}`)
      }

      const resultData = {
        idealista: data.idealista,
        instagram: data.instagram,
        email: data.email,
        english: data.english,
      }

      setResults(resultData)
      setGenCount((c) => c + 1)
      toast.success('Contenido generado correctamente')

      // Save to history
      saveGeneration(formData, resultData)

      // Refresh profile to update generations_used
      refreshProfile()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleHistorySelect = (item) => {
    setResults({
      idealista: item.result_idealista,
      instagram: item.result_instagram,
      email: item.result_email,
      english: item.result_english,
    })
    setShowHistory(false)
    toast.info('Generacion anterior cargada')
  }

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <Header genCount={genCount} />

      <main className="flex-1 w-full max-w-[720px] mx-auto px-5 sm:px-6 py-8 sm:py-12">
        {/* Usage bar */}
        {profile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-6"
          >
            {/* History toggle */}
            {history.length > 0 && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                style={{
                  background: showHistory ? 'rgba(245, 166, 35, 0.08)' : 'transparent',
                  border: `1px solid ${showHistory ? 'rgba(245, 166, 35, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                  color: showHistory ? '#f5a623' : 'rgba(245, 245, 240, 0.35)',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "'Cabinet Grotesk', system-ui",
                  padding: '6px 14px',
                  borderRadius: 10,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  letterSpacing: '0.3px',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Historial ({history.length})
              </button>
            )}

            {/* Usage indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginLeft: 'auto',
            }}>
              <div style={{
                width: 80,
                height: 4,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.06)',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  borderRadius: 2,
                  background: profile.generations_used / profile.generations_limit > 0.8
                    ? '#ef4444'
                    : '#f5a623',
                  width: `${Math.min((profile.generations_used / profile.generations_limit) * 100, 100)}%`,
                  transition: 'width 0.5s ease',
                }} />
              </div>
              <span style={{
                fontSize: 11,
                color: 'rgba(245, 245, 240, 0.25)',
                fontFamily: "'Cabinet Grotesk', system-ui",
                fontWeight: 500,
              }}>
                {profile.generations_used}/{profile.generations_limit}
              </span>
            </div>
          </motion.div>
        )}

        {/* History panel */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              key="history"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={spring}
              className="mb-8 overflow-hidden"
            >
              <HistoryPanel
                history={history}
                onSelect={handleHistorySelect}
                onClose={() => setShowHistory(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <PropertyForm onGenerate={handleGenerate} loading={loading} />

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={springSnappy}
              className="mt-8 p-4 rounded-xl"
              style={{ border: '1px solid rgba(239, 68, 68, 0.15)', background: 'rgba(239, 68, 68, 0.04)' }}
            >
              <p className="text-red-400 text-sm" style={{ fontFamily: "'Cabinet Grotesk', system-ui" }}>{error}</p>
            </motion.div>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={spring}
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
              transition={spring}
              className="mt-12"
            >
              <EmptyState />
            </motion.div>
          )}

          {results && !loading && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={spring}
              className="mt-10"
            >
              <ResultsGrid results={results} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default App
