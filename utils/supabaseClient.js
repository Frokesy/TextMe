import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sfkajewoyefbteavxhiw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNma2FqZXdveWVmYnRlYXZ4aGl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMyODQ0OTksImV4cCI6MTk3ODg2MDQ5OX0.Joz2JjShMatKM_hnjlO3_mRVVXXgdxykX1E6NlasF0s'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)