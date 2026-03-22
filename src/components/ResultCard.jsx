import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineClipboardCopy, HiCheck } from 'react-icons/hi'

export default function ResultCard({ channel, icon, content }) {
  const [copied, setCopied] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    setDisplayedText('')
    setTyping(true)
    let i = 0
    const speed = 8
    const interval = setInterval(() => {
      i += 3
      if (i >= content.length) {
        setDisplayedText(content)
        setTyping(false)
        clearInterval(interval)
      } else {
        setDisplayedText(content.slice(0, i))
      }
    }, speed)
    return () => clearInterval(interval)
  }, [content])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = content
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-xl overflow-hidden"
      style={{
        background: 'rgba(17, 17, 17, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="flex items-center gap-2.5">
          <span className="text-accent">{icon}</span>
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em]">{channel}</span>
        </div>

        <button
          onClick={handleCopy}
          className={`p-2 rounded-lg transition-all duration-200 ${
            copied
              ? 'text-accent bg-accent/10'
              : 'text-zinc-600 hover:text-zinc-300 hover:bg-white/5'
          }`}
          title="Copiar al portapapeles"
        >
          {copied ? <HiCheck size={16} /> : <HiOutlineClipboardCopy size={16} />}
        </button>
      </div>

      {/* Content */}
      <div className="px-5 py-5 min-h-[200px]">
        <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap font-[Inter]">
          {displayedText}
          {typing && (
            <span
              className="inline-block w-0.5 h-4 bg-accent ml-0.5 align-text-bottom"
              style={{ animation: 'blink 0.8s step-end infinite' }}
            />
          )}
        </p>
      </div>
    </motion.div>
  )
}
