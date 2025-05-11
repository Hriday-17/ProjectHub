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
  INTERNAL_ERROR: {
    code: 'auth/internal-error',
    message: 'An internal error occurred. Please try again later.',
    status: 500,
  },
  INVALID_TOKEN: {
    code: 'auth/invalid-token',
    message: 'Invalid or expired authentication token',
    status: 401,
  },
  SERVER_ERROR: {
    code: 'auth/server-error',
    message: 'An internal server error occurred',
    status: 500,
  },
  SUPABASE_ERROR: {
    code: 'auth/supabase-error',
    message: 'Database operation failed',
    status: 500,
  },
  TOKEN_EXPIRED: {
    code: 'auth/token-expired',
    message: 'Authentication token has expired',
    status: 401,
  },
  MISSING_FIELDS: {
    code: 'auth/missing-fields',
    message: 'Please provide all required fields',
    status: 400,
  },
} as const;

interface ErrorResponse {
  error: ApiError;
}

function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return error instanceof ApiErrorResponse;
}

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  );
}

/**
 * Handles API errors and returns appropriate response
 */
export function handleApiError(error: unknown): NextResponse<ErrorResponse> {
  console.error('API Error:', error);

  if (isApiErrorResponse(error)) {
    return NextResponse.json(
      { error: error.error },
      { status: error.error.status }
    );
  }

  const message = isErrorWithMessage(error) ? error.message : 'An unexpected error occurred';

  const serverError = {
    ...AUTH_ERRORS.SERVER_ERROR,
    details: { originalError: message }
  };

  return NextResponse.json(
    { error: serverError },
    { status: AUTH_ERRORS.SERVER_ERROR.status }
  );
}
