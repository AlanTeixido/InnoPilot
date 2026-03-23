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
    setCopied(false)
    let i = 0
    const interval = setInterval(() => {
      i += 4
      if (i >= content.length) {
        setDisplayedText(content)
        setTyping(false)
        clearInterval(interval)
      } else {
        setDisplayedText(content.slice(0, i))
      }
    }, 15)
    return () => clearInterval(interval)
  }, [content])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
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
    <div
      className="relative rounded-xl overflow-hidden"
      style={{
        background: '#111114',
        border: '1px solid rgba(240, 165, 0, 0.12)',
        borderTop: '2px solid #f0a500',
        boxShadow: '0 0 40px rgba(240, 165, 0, 0.04), 0 16px 48px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(240, 165, 0, 0.08)' }}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: '#f0a500' }}>{icon}</span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(245, 245, 240, 0.5)', fontFamily: "'Cabinet Grotesk', system-ui", letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            {channel}
          </span>
          <div className="flex items-center gap-1 ml-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#f0a500', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontSize: '9px', color: 'rgba(240, 165, 0, 0.4)', fontFamily: "'Cabinet Grotesk', system-ui", letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500 }}>IA</span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg transition-all duration-200"
            style={{
              color: copied ? '#f0a500' : 'rgba(245, 245, 240, 0.25)',
              background: copied ? 'rgba(240, 165, 0, 0.1)' : 'transparent',
            }}
            onMouseEnter={(e) => { if (!copied) e.currentTarget.style.color = 'rgba(245, 245, 240, 0.6)' }}
            onMouseLeave={(e) => { if (!copied) e.currentTarget.style.color = 'rgba(245, 245, 240, 0.25)' }}
          >
            {copied ? <HiCheck size={15} /> : <HiOutlineClipboardCopy size={15} />}
          </button>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: '10px', color: '#f0a500', fontFamily: "'Cabinet Grotesk', system-ui", fontWeight: 500, background: 'rgba(240, 165, 0, 0.1)' }}
              className="absolute -bottom-7 right-0 px-2 py-0.5 rounded whitespace-nowrap"
            >
              Copiado!
            </motion.span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 min-h-[160px] max-h-[320px] overflow-y-auto">
        <p className="text-[13px] leading-relaxed whitespace-pre-wrap" style={{ color: 'rgba(245, 245, 240, 0.65)', fontFamily: "'Cabinet Grotesk', system-ui" }}>
          {displayedText}
          {typing && (
            <span
              className="inline-block w-0.5 h-3.5 ml-0.5 align-text-bottom"
              style={{ backgroundColor: '#f0a500', animation: 'blink 0.8s step-end infinite' }}
            />
          )}
        </p>
      </div>
    </div>
  )
}
