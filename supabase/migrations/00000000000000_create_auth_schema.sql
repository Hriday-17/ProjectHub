-- Create users table with proper constraints
create table public.users (
    id uuid default uuid_generate_v4() primary key,
    username text not null,
    email text not null unique check (email ~ '^[a-zA-Z0-9._%+-]+@mahindrauniversity\.edu\.in$'),
    password text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    role text default 'student'::text check (role in ('student', 'mentor', 'admin')),
    is_verified boolean default false
);

-- Create an auth trigger for managing updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

create trigger handle_users_updated_at
    before update on public.users
    for each row
    execute function public.handle_updated_at();

-- Set up Row Level Security (RLS)
alter table public.users enable row level security;

-- Create policies
create policy "Users can view their own profile"
    on public.users for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on public.users for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

-- Create email verification tokens table
create table public.verification_tokens (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete cascade,
    token text not null unique,
    expires_at timestamp with time zone not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for verification tokens
alter table public.verification_tokens enable row level security;

create policy "Users can view their own verification tokens"
    on public.verification_tokens for select
    using (auth.uid() = user_id);
