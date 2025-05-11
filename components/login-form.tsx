// Component: Replicates user authentication login form
'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';
import { Github } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmailDomain = (email: string) => {
    return email.endsWith('@mahindrauniversity.edu.in');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateEmailDomain(email)) {
      setError('Only @mahindrauniversity.edu.in email addresses are allowed');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login - redirect to dashboard
        window.location.replace('/dashboard');
      } else {
        // Handle specific error cases
        switch (data.error?.code) {
          case 'auth/invalid-credentials':
            setError('Invalid email or password');
            break;
          case 'auth/email-not-verified':
            setError('Please verify your email address before logging in');
            break;
          default:
            setError(data.error?.message || 'An error occurred during login');
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-xl shadow-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login to ProjectHub</h1>
        <p className="text-gray-500">Enter your university email to access your projects</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div aria-live="polite" className="text-sm text-red-500" role="alert">
          {error}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">University Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.name@mahindrauniversity.edu.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="[a-z0-9._%+-]+@mahindrauniversity\.edu\.in$"
            title="Please use your Mahindra University email address"
            aria-invalid={error ? 'true' : 'false'}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm text-[#6b3e7c] hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            aria-invalid={error ? 'true' : 'false'}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label htmlFor="remember" className="text-sm font-normal">
            Remember me for 30 days
          </Label>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#6b3e7c] hover:bg-[#5a2e6b]"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <Button variant="outline" className="w-full" type="button">
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link href="/signup" className="text-[#6b3e7c] hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
