// Component: Replicates user authentication signup form
'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select } from './ui/select';
import Link from 'next/link';
import { Github } from 'lucide-react';

export function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*]/.test(password),
    };

    if (!requirements.length) {
      return 'Password must be at least 8 characters long';
    }
    if (!requirements.uppercase || !requirements.lowercase) {
      return 'Password must contain both uppercase and lowercase letters';
    }
    if (!requirements.number) {
      return 'Password must contain at least one number';
    }
    if (!requirements.special) {
      return 'Password must contain at least one special character (!@#$%^&*)';
    }

    return '';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.endsWith('@mahindrauniversity.edu.in')) {
      newErrors.email = 'Only @mahindrauniversity.edu.in email addresses are allowed';
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error?.code === 'auth/validation-error') {
          setErrors({ form: data.error.message });
        } else if (data.error?.code === 'auth/user-exists') {
          setErrors({ email: 'An account with this email already exists' });
        } else {
          setErrors({ form: 'Registration failed. Please try again.' });
        }
        return;
      }

      // Redirect to login with success message 
      window.location.replace('/login?registered=true');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ form: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-xl shadow-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-gray-500">Sign up with your university email to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div aria-live="polite" className="text-sm text-red-500" role="alert">
          {Object.values(errors).join(". ")}
        </div>
        {errors.submit && (
          <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded" role="alert">
            {errors.submit}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            aria-invalid={errors.username ? 'true' : 'false'}
          />
          {errors.username && (
            <p className="text-sm text-red-500" role="alert">{errors.username}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">University Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.name@mahindrauniversity.edu.in"
            pattern="[a-z0-9._%+-]+@mahindrauniversity\.edu\.in$"
            value={formData.email}
            onChange={handleChange}
            required
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-red-500" role="alert">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (
            <p id="password-error" className="text-sm text-red-500" role="alert">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
          />
          {errors.confirmPassword && (
            <p id="confirm-password-error" className="text-sm text-red-500" role="alert">{errors.confirmPassword}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#6b3e7c] hover:bg-[#5a2e6b]"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>

        <div className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-[#6b3e7c] hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
