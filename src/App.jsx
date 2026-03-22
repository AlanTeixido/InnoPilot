import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import PropertyForm from './components/PropertyForm'
import ResultsGrid from './components/ResultsGrid'
import EmptyState from './components/EmptyState'
import LoadingSpinner from './components/LoadingSpinner'
import Footer from './components/Footer'

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [genCount, setGenCount] = useState(0)

  const handleGenerate = async (formData) => {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Error ${response.status}`)
      }

      setResults({
        idealista: data.idealista,
        instagram: data.instagram,
        email: data.email,
        english: data.english,
      })
      setGenCount((c) => c + 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <Header genCount={genCount} />

      <main className="flex-1 w-full max-w-[720px] mx-auto px-5 sm:px-6 py-8 sm:py-12">
        <PropertyForm onGenerate={handleGenerate} loading={loading} />

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 p-4 rounded-xl"
              style={{ border: '1px solid rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.05)' }}
            >
              <p className="text-red-400 text-sm" style={{ fontFamily: 'Outfit' }}>{error}</p>
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
