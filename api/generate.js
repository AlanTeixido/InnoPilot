export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY no configurada en el servidor' })
  }

  const { tipo, ubicacion, precio, habitaciones, banos, metros, puntosFuertes, tono } = req.body

  if (!ubicacion || !metros) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: ubicación y metros' })
  }

  const prompt = `Eres un experto copywriter inmobiliario. Genera contenido de marketing para esta propiedad:

Tipo: ${tipo || 'Piso'}
Ubicación: ${ubicacion}
Precio: ${precio ? precio + '€' : 'A consultar'}
Habitaciones: ${habitaciones || 'N/A'}
Baños: ${banos || 'N/A'}
Metros cuadrados: ${metros}m²
Puntos fuertes: ${puntosFuertes || 'Sin especificar'}
Tono: ${tono || 'Profesional'}

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
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      return res.status(response.status).json({
        error: errData.error?.message || `Error ${response.status} de la API de Anthropic`,
      })
    }

    const data = await response.json()
    const text = data.content[0].text
    const parts = text.split('---SEPARATOR---').map((p) => p.trim())

    if (parts.length >= 4) {
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
