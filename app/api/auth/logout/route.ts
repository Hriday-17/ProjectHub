import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_ERRORS, handleApiError } from '@/lib/api-error';

export async function POST(req: NextRequest) {
  try {
    // Clear the auth token cookie
    cookies().delete('auth-token', {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict',
      path: '/'
    });

    return Response.json({
      message: 'Logged out successfully'
    });
  } catch (error) {
    return handleApiError(error);
  }
