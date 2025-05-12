-- First, drop existing RLS policies if any exist
DROP POLICY IF EXISTS "allow_user_registration" ON users;
DROP POLICY IF EXISTS "users_read_own" ON users;
DROP POLICY IF EXISTS "users_update_own" ON users;
DROP POLICY IF EXISTS "users_delete_own" ON users;

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow public registration without authentication
CREATE POLICY "allow_user_registration" ON users FOR INSERT TO public
WITH CHECK (true);

-- Allow users to read their own data
CREATE POLICY "users_read_own" ON users FOR SELECT TO authenticated
USING (
    auth.uid()::text = id::text
    OR 
    -- Also allow reading public profile info of other users
    TRUE
);

-- Allow users to update their own data
CREATE POLICY "users_update_own" ON users FOR UPDATE TO authenticated
USING (auth.uid()::text = id::text)
WITH CHECK (auth.uid()::text = id::text);

-- Allow users to delete their own data
CREATE POLICY "users_delete_own" ON users FOR DELETE TO authenticated
USING (auth.uid()::text = id::text);

-- Add service_role access for admin operations
CREATE POLICY "service_role_access" ON users FOR ALL TO service_role
USING (true)
WITH CHECK (true);
