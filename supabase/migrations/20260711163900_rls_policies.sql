-- Enable Row Level Security (just in case they aren't enabled already)
alter table live_status enable row level security;
alter table past_sermons enable row level security;

-- Allow anyone to READ the live_status
create policy "Allow public read access on live_status" 
on live_status for select 
using (true);

-- Allow anyone to READ the past_sermons
create policy "Allow public read access on past_sermons" 
on past_sermons for select 
using (true);
