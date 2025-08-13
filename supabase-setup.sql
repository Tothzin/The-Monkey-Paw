-- Create the effects table for The Monkey Paw application
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.effects (
    id SERIAL PRIMARY KEY,
    advantage TEXT NOT NULL,
    disadvantage TEXT NOT NULL,
    flavor_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add some indexes for better performance
CREATE INDEX IF NOT EXISTS idx_effects_created_at ON public.effects(created_at);

-- Optional: Add RLS (Row Level Security) if you want to control access
-- ALTER TABLE public.effects ENABLE ROW LEVEL SECURITY;

-- Optional: Create a policy to allow all operations (for development)
-- CREATE POLICY "Allow all operations on effects" ON public.effects FOR ALL USING (true);
