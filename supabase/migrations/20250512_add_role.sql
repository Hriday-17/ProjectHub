-- Create enum type for role if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('student', 'mentor', 'admin');
    END IF;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add role column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 
                   FROM information_schema.columns 
                   WHERE table_name='users' 
                   AND column_name='role') 
    THEN
        ALTER TABLE users 
        ADD COLUMN role user_role NOT NULL DEFAULT 'student';
    END IF;
END $$;
