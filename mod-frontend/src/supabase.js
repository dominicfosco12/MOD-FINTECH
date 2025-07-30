// mod-frontend/src/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pfyevdnlykkelclyexju.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmeWV2ZG5seWtrZWxjbHlleGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMzA0NzMsImV4cCI6MjA2NTcwNjQ3M30.1RU9iZIptoxsItupdQ0e4o63uSTbvuesGl5razAOQdg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
