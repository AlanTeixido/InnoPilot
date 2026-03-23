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

  const tonoInstructions = {
    'Profesional': 'Usa un tono profesional, formal pero cercano. Vocabulario preciso y descriptivo.',
    'Cercano': 'Usa un tono calido y cercano, como si hablaras con un amigo. Naturalidad ante todo.',
    'Premium': 'Usa un tono exclusivo y sofisticado. Palabras como "excepcional", "privilegiado", "selecto". Transmite lujo.',
    'Emocional': 'Apela a las emociones: el hogar sonado, crear recuerdos, el lugar perfecto para la familia.',
    'Directo': 'Ve al grano. Datos concretos, sin florituras. Eficiente y claro.',
  }

  const tonoGuide = tonoInstructions[tono] || tonoInstructions['Profesional']

  const prompt = `Eres un copywriter inmobiliario de elite en Espana. Conoces el mercado, los portales y como vender propiedades con palabras.

PROPIEDAD:
- Tipo: ${tipo || 'Piso'}
- Ubicacion: ${ubicacion}
- Precio: ${precio ? precio + ' EUR' : 'A consultar'}
- Habitaciones: ${habitaciones || 'No especificado'}
- Banos: ${banos || 'No especificado'}
- Superficie: ${metros} m2
- Puntos fuertes: ${puntosFuertes || 'Sin especificar'}

TONO: ${tono || 'Profesional'} — ${tonoGuide}

GENERA 4 textos separados por "---SEPARATOR---":

1. IDEALISTA/FOTOCASA (200-300 palabras):
- Empieza con una frase gancho que capture la atencion
- Describe la distribucion y espacios de forma fluida, no como una lista
- Destaca la ubicacion y servicios cercanos
- Incluye los puntos fuertes de forma natural
- Cierra con una llamada a la accion para visitar
- NO uses frases genericas como "no te lo pierdas" o "oportunidad unica"

2. INSTAGRAM (max 2200 caracteres):
- Caption atractivo con emojis estrategicos (no excesivos)
- Estructura: gancho + descripcion + beneficios + CTA
- 8-12 hashtags relevantes y especificos al final (mezcla populares con nicho)
- Incluye hashtags de la zona/ciudad
- Tono conversacional adaptado a redes sociales

3. EMAIL MARKETING:
- Asunto: corto, intrigante, que genere apertura (max 60 caracteres)
- Saludo personalizado con [Nombre]
- Primer parrafo: por que les escribes y que hace especial esta propiedad
- Segundo parrafo: detalles clave y puntos fuertes
- Tercer parrafo: urgencia sutil y llamada a visitar
- Firma profesional con placeholders [Tu Nombre], [Agencia], [Telefono]
- NO uses "Espero que este mensaje te encuentre bien"

4. ENGLISH VERSION (200-300 words):
- Professional British English listing for international buyers
- Highlight location advantages for expats/investors
- Include practical details (size in m2 and sq ft)
- Mention proximity to airports, international schools, or beaches if relevant
- Professional closing with viewing invitation

Responde SOLO con los 4 textos separados por "---SEPARATOR---". Sin etiquetas, sin numeracion, sin explicaciones.`

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
