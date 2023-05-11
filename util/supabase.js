const { createClient } = require("@supabase/supabase-js")
// import { TokenExpiredError } from "jsonwebtoken";

// const supabaseURL = process.env.superbase_url;
// const supabaseKey = process.env.superbase_key;
const supabaseURL = "https://rhjykvuphlfyelnadxlm.supabase.co";
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoanlrdnVwaGxmeWVsbmFkeGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5MzY5ODIsImV4cCI6MTk5NzUxMjk4Mn0.6PvOiq_tRkfv4kk_1fMrUWQsqlAE9rzH66PE44cwVks'

const supabase = createClient(supabaseURL, supabaseKey);


module.exports = { supabase }