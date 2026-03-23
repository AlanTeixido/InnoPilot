-- Table: generations (historial de contenido generado)
CREATE TABLE IF NOT EXISTS generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  property_type TEXT NOT NULL DEFAULT 'Piso',
  location TEXT NOT NULL,
  price INTEGER,
  rooms INTEGER,
  bathrooms INTEGER,
  sqm INTEGER NOT NULL,
  highlights TEXT,
  tone TEXT NOT NULL DEFAULT 'Profesional',
  result_idealista TEXT NOT NULL,
  result_instagram TEXT NOT NULL,
  result_email TEXT NOT NULL,
  result_english TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for fast user history lookup
CREATE INDEX IF NOT EXISTS idx_generations_user_id ON generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON generations(created_at DESC);

-- RLS: users can only see their own generations
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own generations"
  ON generations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations"
  ON generations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Add Stripe columns to profiles if they don't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;
