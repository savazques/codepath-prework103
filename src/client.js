import { createClient } from '@supabase/supabase-js';

const URL = 'https://ixnljukifcgyebhtpfyf.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4bmxqdWtpZmNneWViaHRwZnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQxOTMwNDMsImV4cCI6MjAzOTc2OTA0M30.VVwkHTJAqeVxh2ZEWn3EJAQQOgMLAhoQDnjABlxYMMI';

export const supabase = createClient(URL, API_KEY);