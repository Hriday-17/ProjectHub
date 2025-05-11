import { supabase } from '../lib/supabase-client';

interface TestUser {
  username: string;
  email: string;
  password: string;
}

async function runAuthTest() {
  const testUser: TestUser = {
    username: 'Test User',
    email: 'test.user@mahindrauniversity.edu.in',
    password: 'TestPass123!@',
  };

  console.log('🧪 Starting Authentication Tests');
  console.log('===============================');

  try {
    // Cleanup any existing test user
    await supabase.from('users').delete().eq('email', testUser.email);

    // Test Registration
    console.log('\n📝 Testing Registration...');
    const registerRes = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(testUser),
    });

    const registerData = await registerRes.json();
    console.log('Status:', registerRes.status);
    console.log('Response:', registerData);

    if (!registerRes.ok) {
      throw new Error(`Registration failed: ${JSON.stringify(registerData)}`);
    }

    // Test Invalid Registration (duplicate email)
    console.log('\n❌ Testing Invalid Registration...');
    const duplicateRes = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(testUser),
    });

    console.log('Status:', duplicateRes.status);
    if (duplicateRes.status !== 409) {
      throw new Error('Duplicate registration should fail with 409');
    }

    // Test Login
    console.log('\n🔑 Testing Login...');
    const loginRes = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password,
      }),
    });

    const loginData = await loginRes.json();
    console.log('Status:', loginRes.status);
    console.log('Response:', loginData);

    if (!loginRes.ok) {
      throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
    }

    // Test Auth Check
    console.log('\n🔒 Testing Auth Check...');
    const checkRes = await fetch('http://localhost:3000/api/auth/check', {
      credentials: 'include',
    });

    const checkData = await checkRes.json();
    console.log('Status:', checkRes.status);
    console.log('Response:', checkData);

    if (!checkRes.ok || !checkData.authenticated) {
      throw new Error('Auth check failed after login');
    }

    // Test Invalid Login
    console.log('\n❌ Testing Invalid Login...');
    const invalidLoginRes = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: testUser.email,
        password: 'wrongpassword',
      }),
    });

    console.log('Status:', invalidLoginRes.status);
    if (invalidLoginRes.status !== 401) {
      throw new Error('Invalid login should fail with 401');
    }

    // Test Logout
    console.log('\n👋 Testing Logout...');
    const logoutRes = await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    const logoutData = await logoutRes.json();
    console.log('Status:', logoutRes.status);
    console.log('Response:', logoutData);

    if (!logoutRes.ok) {
      throw new Error(`Logout failed: ${JSON.stringify(logoutData)}`);
    }

    // Verify Logout
    console.log('\n🔒 Verifying Logout...');
    const finalCheckRes = await fetch('http://localhost:3000/api/auth/check', {
      credentials: 'include',
    });

    console.log('Status:', finalCheckRes.status);
    if (finalCheckRes.status !== 401) {
      throw new Error('Auth check should fail after logout');
    }

    console.log('\n✅ All authentication tests passed!');
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    throw error;
  } finally {
    // Cleanup
    await supabase.from('users').delete().eq('email', testUser.email);
  }
}

runAuthTest().catch(console.error);
