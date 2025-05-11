import { supabase } from '../lib/supabase-client';

async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('_health').select('*');
    if (error) throw error;
    console.log('✅ Supabase Sync Verified');
    return true;
  } catch (error) {
    console.error('❌ Supabase Connection Error:', error);
    return false;
  }
}

testSupabaseConnection();
