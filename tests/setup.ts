import '@testing-library/jest-dom';
import { expect, vi, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';

expect.extend(matchers as any);

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;

global.fetch = vi.fn();

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

afterEach(() => {
  vi.resetAllMocks();
  cleanup();
});

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

interface AuthRequest {
  email: string;
  password?: string;
  username?: string;
}

const handlers = [
  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json() as AuthRequest;
    
    if (!body.email.endsWith('@mahindrauniversity.edu.in')) {
      return HttpResponse.json(
        {
          error: {
            code: 'auth/invalid-email-domain',
            message: 'Only @mahindrauniversity.edu.in email addresses are allowed',
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        user: {
          id: 'test-id',
          email: body.email,
          username: body.username ?? 'testuser',
          role: 'student',
          isVerified: false,
        },
      },
      { status: 201 }
    );
  }),

  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as AuthRequest;
    
    if (
      body.email === 'test.user@mahindrauniversity.edu.in' &&
      body.password === 'Test@123Password'
    ) {
      return HttpResponse.json(
        {
          user: {
            id: 'test-id',
            email: body.email,
            username: 'testuser',
            role: 'student',
            isVerified: true,
          },
        },
        { 
          status: 200,
          headers: {
            'Set-Cookie': 'auth-token=test.jwt.token; Path=/; HttpOnly; Secure; SameSite=Strict',
          },
        }
      );
    }

    return HttpResponse.json(
      {
        error: {
          code: 'auth/invalid-credentials',
          message: 'Invalid email or password',
          status: 401,
        },
      },
      { status: 401 }
    );
  }),

  http.get('/api/auth/check', async ({ request }) => {
    const authToken = request.headers.get('Cookie')?.includes('auth-token=test.jwt.token');

    if (!authToken) {
      return HttpResponse.json(
        {
          error: {
            code: 'auth/unauthorized',
            message: 'Unauthorized',
            status: 401,
          },
        },
        { status: 401 }
      );
    }

    return HttpResponse.json(
      {
        user: {
          id: 'test-id',
          email: 'test.user@mahindrauniversity.edu.in',
          username: 'testuser',
          role: 'student',
          isVerified: true,
        },
      },
      { status: 200 }
    );
  }),

  http.post('/api/auth/logout', () => {
    return HttpResponse.json(
      { message: 'Logged out successfully' },
      {
        status: 200,
        headers: {
          'Set-Cookie': 'auth-token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0',
        },
      }
    );
  }),
];

export const server = setupServer(...handlers);

beforeAll(() => {
  // Mock ResizeObserver
  class ResizeObserverMock {
    observe() { /* noop */ }
    unobserve() { /* noop */ }
    disconnect() { /* noop */ }
  }
  global.ResizeObserver = ResizeObserverMock;

  // Start MSW server
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
