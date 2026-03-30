import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://bsdhxgkcjkjpqaxwelqp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzZGh4Z2tjamtqcHFheHdlbHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NjM1OTMsImV4cCI6MjA5MDAzOTU5M30.WRAK89d9YAA3B_sw4JpDU8Xk-G0bb-DpPZNSn2FB1Z8"
);
