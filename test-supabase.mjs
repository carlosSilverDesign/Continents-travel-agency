import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vtqvatfiscyxihufqsfi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0cXZhdGZpc2N5eGlodWZxc2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTg5NzQsImV4cCI6MjA4Nzk3NDk3NH0.LFShYvFBQuEoROm_2sL2LX8kmQH_aIKWLKzA9aHGzaE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data: toursData, error: toursError } = await supabase
    .from("tours")
    .select("id, title, locale, price, category, created_at")
    .order("created_at", { ascending: false });

  if (toursError) throw toursError;
  console.log("Tours:", toursData.length);
}

test().catch(console.error);
