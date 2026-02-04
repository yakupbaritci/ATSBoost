-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table
create table public.users (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  provider text,
  credits int default 0,
  stripe_customer_id text,
  subscription_tier text default 'none', -- 'none', 'monthly', 'yearly'
  subscription_end_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;

-- Policies for Users
create policy "Users can view their own profile"
  on public.users for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on public.users for update
  using ( auth.uid() = id );

-- Handle new user signup (Trigger)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Resumes Table
create table public.resumes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  title text default 'My Resume',
  content jsonb default '{}'::jsonb, -- Structured data: { contact, experience: [], ... }
  original_pdf_url text,
  is_optimized boolean default false,
  language text default 'en',
  target_job_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Resumes
alter table public.resumes enable row level security;

create policy "Users can view own resumes"
  on public.resumes for select
  using ( auth.uid() = user_id );

create policy "Users can insert own resumes"
  on public.resumes for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own resumes"
  on public.resumes for update
  using ( auth.uid() = user_id );

create policy "Users can delete own resumes"
  on public.resumes for delete
  using ( auth.uid() = user_id );


-- Analysis Reports Table
create table public.analysis_reports (
  id uuid default uuid_generate_v4() primary key,
  resume_id uuid references public.resumes(id) on delete cascade not null,
  score int,
  red_flags jsonb,
  recommendations jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Analysis (inherit from resume ownership implicitly by join or explicit check)
alter table public.analysis_reports enable row level security;

create policy "Users can view analysis of own resumes"
  on public.analysis_reports for select
  using ( exists ( select 1 from public.resumes where id = analysis_reports.resume_id and user_id = auth.uid() ) );
