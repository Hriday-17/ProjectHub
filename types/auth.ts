export interface User {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  created_at?: string;
  updated_at?: string;
  is_verified: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
  details?: Record<string, unknown>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}

export interface AuthResponse {
  user: User | null;
  error?: ApiError;
}

export interface AuthSuccess {
  success: true;
  user: User;
}

export interface AuthFailure {
  success: false;
  error: ApiError;
}

export type AuthResult = AuthSuccess | AuthFailure;

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  isVerified: boolean;
  username: string;
  iat?: number;
  exp?: number;
}
