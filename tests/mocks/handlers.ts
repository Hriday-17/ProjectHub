import { http, HttpResponse } from 'msw';

// Define response types for better type safety
type LoginResponse = { success: true } | { error: { code: string; message: string } };
type RegisterResponse = { success: true } | { error: { code: string; message: string } };
type AuthCheckResponse = { isAuthenticated: boolean };

// Define request body types
type LoginRequestBody = { email: string; password: string };
type RegisterRequestBody = { email: string };

export const handlers = [
  // Mock successful login
  http.post<never, LoginResponse>('/api/auth/login', async ({ request }) => {
    try {
      const body = await request.json() as unknown as LoginRequestBody;
    
      if (body.email === 'test.user@mahindrauniversity.edu.in' && body.password === 'ValidPass123!') {
        return HttpResponse.json({ success: true });
      }
    
      return HttpResponse.json(
        { error: { code: 'auth/invalid-credentials', message: 'Invalid email or password' } },
        { status: 401 }
      );
    } catch (error) {
      return HttpResponse.json(
        { error: { code: 'auth/invalid-request', message: 'Invalid request format' } },
        { status: 400 }
      );
    }
  }),

  // Mock registration
  http.post<never, RegisterResponse>('/api/auth/register', async ({ request }) => {
    try {
      const body = await request.json() as unknown as RegisterRequestBody;
    
      if (body.email === 'test.user@mahindrauniversity.edu.in') {
        return HttpResponse.json(
          { error: { code: 'auth/user-exists', message: 'User already exists' } },
          { status: 400 }
        );
      }
    
      if (body.email === 'new.user@mahindrauniversity.edu.in') {
        return HttpResponse.json({ success: true });
      }

      return HttpResponse.json(
        { error: { code: 'auth/validation-error', message: 'Invalid registration data' } },
        { status: 400 }
      );
    } catch (error) {
      return HttpResponse.json(
        { error: { code: 'auth/invalid-request', message: 'Invalid request format' } },
        { status: 400 }
      );
    }
  }),

  // Mock auth check
  http.get<never, AuthCheckResponse>('/api/auth/check', () => {
    return HttpResponse.json({ isAuthenticated: false });
  })
];