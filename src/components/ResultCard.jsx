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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-xl overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        boxShadow: '0 0 0 1px rgba(0, 255, 136, 0.05), 0 32px 64px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="flex items-center gap-2.5">
          <span className="text-accent">{icon}</span>
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em]">{channel}</span>
          <div className="flex items-center gap-1.5 ml-2">
            <div
              className="w-1.5 h-1.5 rounded-full bg-accent"
              style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
            />
            <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-medium">IA</span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-all duration-200 ${
              copied
                ? 'text-accent bg-accent/10'
                : 'text-zinc-600 hover:text-zinc-300 hover:bg-white/5'
            }`}
          >
            {copied ? <HiCheck size={16} /> : <HiOutlineClipboardCopy size={16} />}
          </button>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-7 right-0 text-[10px] text-accent font-medium bg-accent/10 px-2 py-0.5 rounded whitespace-nowrap"
            >
              Copiado!
            </motion.span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-5 min-h-[200px]">
        <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
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
