import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Simple in-memory rate limiter
const rateLimit = new Map()
const RATE_LIMIT_WINDOW = 60000
const RATE_LIMIT_MAX = 10

function checkRateLimit(userId) {
  const now = Date.now()
  const userRequests = rateLimit.get(userId) || []
  const recent = userRequests.filter((t) => now - t < RATE_LIMIT_WINDOW)
  if (recent.length >= RATE_LIMIT_MAX) return false
  recent.push(now)
  rateLimit.set(userId, recent)
  return true
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API key no configurada en el servidor' })
  }

  const { tipo, ubicacion, precio, habitaciones, banos, metros, puntosFuertes, tono, userId } = req.body

  if (!ubicacion || !metros) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: ubicacion y metros' })
  }

  // Check generation limits if userId provided
  if (userId) {
    if (!checkRateLimit(userId)) {
      return res.status(429).json({ error: 'Demasiadas peticiones. Espera un momento.' })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('plan, generations_used, generations_limit')
      .eq('id', userId)
      .single()

    if (profile) {
      if (profile.generations_used >= profile.generations_limit) {
        return res.status(403).json({
          error: `Has alcanzado el limite de ${profile.generations_limit} generaciones de tu plan ${profile.plan || 'free'}. Actualiza tu plan para seguir generando.`,
          limit_reached: true,
        })
      }
    }
  }

  const prompt = `Eres un experto copywriter inmobiliario. Genera contenido de marketing para esta propiedad:

Tipo: ${tipo || 'Piso'}
Ubicacion: ${ubicacion}
Precio: ${precio ? precio + 'EUR' : 'A consultar'}
Habitaciones: ${habitaciones || 'N/A'}
Banos: ${banos || 'N/A'}
Metros cuadrados: ${metros}m2
Puntos fuertes: ${puntosFuertes || 'Sin especificar'}
Tono: ${tono || 'Profesional'}

Genera EXACTAMENTE 4 bloques de texto separados por "---SEPARATOR---":

1. IDEALISTA: Descripcion profesional para portal inmobiliario (150-250 palabras). Formal pero atractivo.

2. INSTAGRAM: Caption para Instagram con emojis, hashtags relevantes y call to action. Max 2200 caracteres.

3. EMAIL: Email de marketing para enviar a potenciales compradores. Incluye asunto, saludo, cuerpo y cierre. Profesional y persuasivo.

4. ENGLISH: Professional property listing in English for international buyers (150-250 words).

Responde SOLO con los 4 textos separados por "---SEPARATOR---", sin numerar ni anadir etiquetas.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 4096,
        messages: [
          { role: 'system', content: 'Eres un experto copywriter inmobiliario espanol. Generas contenido profesional, persuasivo y adaptado a cada canal.' },
          { role: 'user', content: prompt },
        ],
      }),
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      return res.status(response.status).json({
        error: errData.error?.message || `Error ${response.status} de la API`,
      })
    }

    const data = await response.json()
    const text = data.choices[0].message.content
    const parts = text.split('---SEPARATOR---').map((p) => p.trim())

    if (parts.length >= 4) {
      // Increment generations_used
      if (userId) {
        try {
          await supabase.rpc('increment_generations', { user_id_input: userId })
        } catch {
          // fallback
          await supabase.from('profiles').update({ generations_used: 1 }).eq('id', userId)
        }
      }

      return res.status(200).json({
        idealista: parts[0],
        instagram: parts[1],
        email: parts[2],
        english: parts[3],
      })
    } else {
      return res.status(500).json({ error: 'Formato de respuesta inesperado de la IA' })
    }
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Error interno del servidor' })
  }
}
