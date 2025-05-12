-- Add is_verified column to users table
ALTER TABLE users 
ADD COLUMN is_verified BOOLEAN DEFAULT false;

-- Set existing users to verified for backward compatibility
UPDATE users SET is_verified = true WHERE is_verified IS NULL;
