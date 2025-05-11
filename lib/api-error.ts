import { NextResponse } from 'next/server';

export interface ApiError {
  code: string;
  message: string;
  status: number;
  details?: Record<string, unknown>;
}

export class ApiErrorResponse extends Error {
  constructor(public error: ApiError) {
    super(error.message);
    this.name = 'ApiErrorResponse';
  }
}

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: {
    code: 'auth/invalid-credentials',
    message: 'Invalid email or password',
    status: 401,
  },
  INVALID_EMAIL_DOMAIN: {
    code: 'auth/invalid-email-domain',
    message: 'Only @mahindrauniversity.edu.in email addresses are allowed',
    status: 400,
  },
  USER_EXISTS: {
    code: 'auth/user-exists',
    message: 'User already exists with this email',
    status: 409,
  },
  USER_NOT_FOUND: {
    code: 'auth/user-not-found',
    message: 'User not found',
    status: 404,
  },
  EMAIL_NOT_VERIFIED: {
    code: 'auth/email-not-verified',
    message: 'Please verify your email address before logging in',
    status: 403,
  },
  UNAUTHORIZED: {
    code: 'auth/unauthorized',
    message: 'You must be logged in to access this resource',
    status: 401,
  },
  WEAK_PASSWORD: {
    code: 'auth/weak-password',
    message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character',
    status: 400,
  },
  INVALID_TOKEN: {
    code: 'auth/invalid-token',
    message: 'Invalid or expired authentication token',
    status: 401,
  },
  MISSING_FIELDS: {
    code: 'auth/missing-fields',
    message: 'Please provide all required fields',
    status: 400,
  },
  SERVER_ERROR: {
    code: 'auth/server-error',
    message: 'Internal server error',
    status: 500,
  }
} as const;

export function handleApiError(error: unknown) {
  if (error instanceof ApiErrorResponse) {
    return NextResponse.json({ error: error.error }, { status: error.error.status });
  }
  return NextResponse.json({ error: AUTH_ERRORS.SERVER_ERROR }, { status: 500 });
}
