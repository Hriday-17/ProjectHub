import { expect, test, describe, beforeAll, afterAll } from 'vitest';
import { supabase } from '@/lib/supabase-client';
import { AUTH_ERRORS } from '@/lib/api-error';

interface TestUser {
  username: string;
  email: string;
  password: string;
}

const testUser: TestUser = {
  username: 'testuser',
  email: 'test.user@mahindrauniversity.edu.in',
  password: 'Test@123Password',
};

const authHeaders = { 'Content-Type': 'application/json' };

describe('Authentication System', () => {
  beforeAll(async () => {
    await supabase.from('users').delete().eq('email', testUser.email);
  });

  afterAll(async () => {
    await supabase.from('users').delete().eq('email', testUser.email);
  });

  describe('Registration', () => {
    test('should reject invalid email domain', async () => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ ...testUser, email: 'test@invalid.com' }),
      });

      const data = await response.json();
      expect(response.status).toBe(400);
      expect(data.error.code).toBe(AUTH_ERRORS.INVALID_EMAIL_DOMAIN.code);
    });

    test('should reject weak password', async () => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ ...testUser, password: 'weak' }),
      });

      const data = await response.json();
      expect(response.status).toBe(400);
      expect(data.error.code).toBe(AUTH_ERRORS.WEAK_PASSWORD.code);
    });

    test('should successfully register valid user', async () => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(testUser),
      });

      const data = await response.json();
      expect(response.status).toBe(201);
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe(testUser.email);
    });

    test('should reject duplicate registration', async () => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(testUser),
      });

      const data = await response.json();
      expect(response.status).toBe(409);
      expect(data.error.code).toBe(AUTH_ERRORS.USER_EXISTS.code);
    });
  });

  describe('Login', () => {
    test('should reject unverified email', async () => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password,
        }),
      });

      const data = await response.json();
      expect(response.status).toBe(403);
      expect(data.error.code).toBe(AUTH_ERRORS.EMAIL_NOT_VERIFIED.code);
    });

    test('should reject invalid credentials', async () => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          email: testUser.email,
          password: 'wrongpassword',
        }),
      });

      const data = await response.json();
      expect(response.status).toBe(401);
      expect(data.error.code).toBe(AUTH_ERRORS.INVALID_CREDENTIALS.code);
    });

    test('should successfully login verified user', async () => {
      await supabase
        .from('users')
        .update({ is_verified: true })
        .eq('email', testUser.email);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password,
        }),
      });

      const data = await response.json();
      expect(response.status).toBe(200);
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe(testUser.email);

      const cookies = response.headers.get('set-cookie');
      expect(cookies).toBeDefined();
      expect(cookies).toContain('auth-token');
    });
  });

  describe('Authentication Check', () => {
    test('should reject requests without auth token', async () => {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      
      expect(response.status).toBe(401);
      expect(data.error.code).toBe(AUTH_ERRORS.UNAUTHORIZED.code);
    });

    test('should reject invalid auth token', async () => {
      const response = await fetch('/api/auth/check', {
        headers: { Cookie: 'auth-token=invalid.token.here' },
      });

      const data = await response.json();
      expect(response.status).toBe(401);
      expect(data.error.code).toBe(AUTH_ERRORS.UNAUTHORIZED.code);
    });

    test('should accept valid auth token', async () => {
      const loginResponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password,
        }),
      });

      const cookies = loginResponse.headers.get('set-cookie');
      const response = await fetch('/api/auth/check', {
        headers: { Cookie: cookies || '' },
      });

      const data = await response.json();
      expect(response.status).toBe(200);
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe(testUser.email);
    });
  });

  describe('Logout', () => {
    test('should successfully logout and clear auth token', async () => {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      expect(response.status).toBe(200);

      const cookies = response.headers.get('set-cookie');
      expect(cookies).toBeDefined();
      expect(cookies).toContain('auth-token=;');
    });
  });

  describe('Protected Routes', () => {
    const protectedRoutes = [
      '/dashboard',
      '/profile',
      '/projects',
      '/submit-idea',
      '/tasks',
      '/mentor-projects',
    ];

    test.each(protectedRoutes)('should protect %s', async (route) => {
      const response = await fetch(route);
      expect(response.status).toBe(401);
      
      const redirectUrl = new URL(response.url);
      expect(redirectUrl.pathname).toBe('/login');
    });
  });
});
