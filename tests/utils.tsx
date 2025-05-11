import { render as testingLibraryRender } from '@testing-library/react';
import { AuthProvider } from '@/components/auth-provider';
import { ReactNode } from 'react';
import { expect, vi } from 'vitest';
import type { User } from '@/types/auth';

export * from '@testing-library/react';

// Mock window.location
const mockLocation = {
  href: '',
  pathname: '',
  search: '',
  hash: '',
  assign: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn()
};

// Add custom matchers for testing error messages
// Add custom matchers for testing error messages
declare global {
  namespace Vi {
    interface JestAssertion {
      toHaveErrorMessage(message: string): void;
    }
  }
}

expect.extend({
  toHaveErrorMessage(received: HTMLElement, expectedMessage: string) {
    const errorElement = received.querySelector('[role="alert"]');
    const message = errorElement?.textContent ?? '';
    const pass = message.includes(expectedMessage);

    return {
      message: () =>
        `expected element to ${pass ? 'not ' : ''}have error message "${expectedMessage}"`,
      pass,
    };
  },
});

// Define types for user and auth state
export interface TestUser {
  id: string;
  email: string;
  username: string;
  role: 'student' | 'mentor' | 'admin';
  is_verified: boolean;
}

interface RenderOptions {
  initialAuth?: {
    user: TestUser | null;
    loading?: boolean;
  };
}

// Custom render function with AuthProvider wrapper
function Wrapper({ children }: { children: ReactNode }) {
  Object.defineProperty(window, 'location', {
    value: mockLocation,
    writable: true
  });
  
  return <AuthProvider>{children}</AuthProvider>;
}

const render = (ui: React.ReactElement) => {
  return testingLibraryRender(ui, {
    wrapper: Wrapper
  });
};

// Reset location mock between tests
beforeEach(() => {
  mockLocation.href = 'http://localhost:3000/';
  mockLocation.pathname = '/';
  mockLocation.search = '';
  mockLocation.hash = '';
  vi.clearAllMocks();
});

export { render, mockLocation };

// Mock responses for authentication endpoints with proper typing
export interface AuthResponse {
  ok: boolean;
  json: () => Promise<{ user?: TestUser; error?: { code: string; message: string; status: number } }>;
}

export const mockResponses: Record<string, AuthResponse> = {
  validLogin: {
    ok: true,
    json: async () => ({
      user: {
        id: 'test-user-id',
        email: 'test@mahindrauniversity.edu.in',
        username: 'testuser',
        role: 'student',
        is_verified: true
      }
    })
  },
  invalidCredentials: {
    ok: false,
    json: async () => ({
      error: {
        code: 'auth/invalid-credentials',
        message: 'Invalid email or password',
        status: 401
      }
    })
  },
  invalidEmailDomain: {
    ok: false,
    json: async () => ({
      error: {
        code: 'auth/invalid-email-domain',
        message: 'Only @mahindrauniversity.edu.in email addresses are allowed',
        status: 400
      }
    })
  },
  emailNotVerified: {
    ok: false,
    json: async () => ({
      error: {
        code: 'auth/email-not-verified',
        message: 'Please verify your email address before logging in',
        status: 403
      }
    })
  },
  successfulRegistration: {
    ok: true,
    json: async () => ({
      user: {
        id: 'new-user-id',
        email: 'new@mahindrauniversity.edu.in',
        username: 'newuser',
        role: 'student',
        is_verified: false
      }
    })
  }
};
