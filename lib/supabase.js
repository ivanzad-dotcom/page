import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://bsdhxgkcjkjpqaxwelqp.supabase.co",
  "TVOJ_ANON_KEY"
);
