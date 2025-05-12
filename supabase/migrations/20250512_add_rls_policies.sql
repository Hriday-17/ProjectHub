-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy for user registration (allow inserts)
CREATE POLICY "allow_user_registration" ON users
    FOR INSERT
    WITH CHECK (true);

-- Policy for users to read their own data
CREATE POLICY "users_read_own" ON users
    FOR SELECT
    USING (auth.uid() = id);

-- Policy for users to update their own data
CREATE POLICY "users_update_own" ON users
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Policy for users to delete their own data
CREATE POLICY "users_delete_own" ON users
    FOR DELETE
    USING (auth.uid() = id);
