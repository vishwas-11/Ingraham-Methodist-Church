-- Create live_status table
create table if not exists live_status (
  id int primary key default 1,
  is_live boolean default false,
  platform text, -- 'facebook' | 'youtube' | null
  video_id text, -- youtube video id, if platform = youtube
  embed_url text, -- direct embed URL to use (fb plugin url or youtube embed url)
  title text,
  thumbnail_url text,
  last_checked timestamptz default now()
);

-- Insert the single row used to track status
insert into live_status (id) values (1) on conflict (id) do nothing;

-- Create past_sermons table
create table if not exists past_sermons (
  id uuid primary key default gen_random_uuid(),
  video_id text unique,
  title text,
  thumbnail_url text,
  published_at timestamptz,
  video_url text,
  inserted_at timestamptz default now()
);

-- Enable Realtime on the live_status table
alter publication supabase_realtime add table live_status;

-- If RLS is enabled, you might need these policies to allow read access:
-- alter table live_status enable row level security;
-- alter table past_sermons enable row level security;

-- create policy "Allow public read access on live_status" on live_status for select using (true);
-- create policy "Allow public read access on past_sermons" on past_sermons for select using (true);
