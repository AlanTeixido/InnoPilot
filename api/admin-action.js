import { createClient } from '@supabase/supabase-js'

const ADMIN_USER_ID = '447ff12b-65c7-4eed-941a-9ddc4e5cb620'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { userId, action, targetUserId, data } = req.body
  if (userId !== ADMIN_USER_ID) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  try {
    switch (action) {
      case 'update_profile': {
        const { error } = await supabase
          .from('profiles')
          .update(data)
          .eq('id', targetUserId)
        if (error) throw error
        return res.status(200).json({ ok: true })
      }

      case 'delete_user': {
        // Delete generations first
        await supabase.from('generations').delete().eq('user_id', targetUserId)
        // Delete profile
        await supabase.from('profiles').delete().eq('id', targetUserId)
        // Delete auth user
        const { error } = await supabase.auth.admin.deleteUser(targetUserId)
        if (error) throw error
        return res.status(200).json({ ok: true })
      }

      case 'reset_usage': {
        const { error } = await supabase
          .from('profiles')
          .update({ generations_used: 0 })
          .eq('id', targetUserId)
        if (error) throw error
        return res.status(200).json({ ok: true })
      }

      case 'get_generations': {
        const { data: gens, error } = await supabase
          .from('generations')
          .select('id, property_type, location, sqm, price, tone, created_at')
          .eq('user_id', targetUserId)
          .order('created_at', { ascending: false })
          .limit(20)
        if (error) throw error
        return res.status(200).json({ generations: gens })
      }

      default:
        return res.status(400).json({ error: 'Unknown action' })
    }
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
