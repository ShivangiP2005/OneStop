import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jucggttqkztlhyflslxy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1Y2dndHRxa3p0bGh5ZmxzbHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNDAyNjIsImV4cCI6MjA4MzcxNjI2Mn0.K2qTJIwfumwSowOj8hNW8aT6LaxcX3MQ38t6d2FEb8k'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
