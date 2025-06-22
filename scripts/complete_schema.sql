-- Scholaria Complete Database Schema V1

-- This script sets up the entire database required for the application.
-- It is designed to be run on a fresh project, but includes DROP commands
-- to ensure it can be re-run without errors.

-- Drop existing objects to ensure a clean slate
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TYPE IF EXISTS public.user_role CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Recreate objects
-- Create the user_role type
CREATE TYPE public.user_role AS ENUM ('student', 'teacher', 'admin');

-- 2. Create the profiles table
-- This table stores public-facing user data and custom information like their role.
-- It's linked to the main auth.users table via the user's ID.
DROP TABLE IF EXISTS public.profiles;
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name TEXT,
  role user_role
);

-- 3. Set up Row Level Security (RLS) for the profiles table
-- RLS ensures that users can only access and modify data they are supposed to.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all users to view all profiles.
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

-- Policy: Allow users to create their own profile.
-- The `auth.uid()` function gets the ID of the currently logged-in user.
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy: Allow users to update their own profile.
DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 4. Create the trigger function to handle new user sign-ups
-- This function automatically runs when a new user is created in the auth.users table.
-- It inserts a corresponding row into our public.profiles table, casting the role
-- from the metadata to our custom user_role type.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', (new.raw_user_meta_data->>'role')::user_role);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create the trigger itself
-- This connects the handle_new_user function to the auth.users table.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Log completion
SELECT 'Database setup complete.' as status;

-- Add a test user
INSERT INTO public.profiles (id, full_name, role)
VALUES ('83ee76d4-2a24-4d87-bf23-5e9d39ffe518', 'eren test', 'student')
ON CONFLICT (id) DO NOTHING; 