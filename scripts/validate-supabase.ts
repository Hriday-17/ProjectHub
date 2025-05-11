import { supabase } from '../lib/supabase-client';

async function validateSupabaseConnection() {
  try {
    // Test database connection
    const { data, error } = await supabase.from('users').select('*').limit(1);
    
    if (error) {
      console.error('❌ Supabase Connection Error:', error.message);
      console.error('Details:', error);
      return false;
    }

    console.log('✅ Supabase Connection Successful');
    console.log('Database Response:', data);

    // Validate required tables
    const { data: tableInfo, error: schemaError } = await supabase
      .from('users')
      .select('id')
      .limit(0);

    if (schemaError) {
      console.error('❌ Users Table Not Found:', schemaError.message);
      return false;
    }

    console.log('✅ Users Table Schema Validated');
    return true;

  } catch (error) {
    console.error('❌ Unexpected Error:', error);
    return false;
  }
}

validateSupabaseConnection();
