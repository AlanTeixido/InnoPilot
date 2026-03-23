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

  const { userId } = req.body
  if (userId !== ADMIN_USER_ID) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  try {
    // Get all profiles with user email
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    // Get all users from auth to get emails
    const { data: { users } } = await supabase.auth.admin.listUsers()

    // Merge data
    const enrichedProfiles = (profiles || []).map((p) => {
      const authUser = users?.find((u) => u.id === p.id)
      return {
        ...p,
        email: authUser?.email || 'N/A',
        provider: authUser?.app_metadata?.provider || 'email',
        last_sign_in: authUser?.last_sign_in_at || null,
        created_at_auth: authUser?.created_at || p.created_at,
      }
    })

    // Summary stats
    const totalUsers = enrichedProfiles.length
    const proUsers = enrichedProfiles.filter((p) => p.plan === 'pro').length
    const agencyUsers = enrichedProfiles.filter((p) => p.plan === 'agency').length
    const totalGenerations = enrichedProfiles.reduce((sum, p) => sum + (p.generations_used || 0), 0)
    const onboarded = enrichedProfiles.filter((p) => p.onboarding_completed).length

    return res.status(200).json({
      summary: {
        totalUsers,
        proUsers,
        agencyUsers,
        freeUsers: totalUsers - proUsers - agencyUsers,
        totalGenerations,
        onboarded,
        mrr: (proUsers * 19) + (agencyUsers * 49),
      },
      users: enrichedProfiles,
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
