import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, mockLocation } from '../utils';
import { LoginForm } from '@/components/login-form';
import { SignupForm } from '@/components/signup-form';

describe('Authentication System', () => {
  describe('LoginForm', () => {
    test('shows validation error for invalid email domain', async () => {
      render(<LoginForm />);

      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@invalid.com' }
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'Test@123Password' }
      });

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(
          /only @mahindrauniversity\.edu\.in/i
        );
      });
    });

    test('shows error for invalid credentials', async () => {
      render(<LoginForm />);

      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'wrong@mahindrauniversity.edu.in' }
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'WrongPass123!' }
      });

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(
          /invalid email or password/i
        );
      });
    });

    test('handles successful login', async () => {
      render(<LoginForm />);

      // Reset location mock
      mockLocation.href = 'http://localhost:3000/';

      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test.user@mahindrauniversity.edu.in' }
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'Test@123Password' }
      });

      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(window.location.href).toContain('/dashboard');
      });
    });
  });

  describe('SignupForm', () => {
    test('validates password requirements', async () => {
      render(<SignupForm />);

      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: 'testuser' }
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@mahindrauniversity.edu.in' }
      });
      fireEvent.change(screen.getByLabelText(/^password$/i), {
        target: { value: 'weak' }
      });

      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(
          /password must be at least 8 characters/i
        );
      });
    });

    test('shows error for existing email', async () => {
      render(<SignupForm />);

      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: 'testuser' }
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test.user@mahindrauniversity.edu.in' }
      });
      fireEvent.change(screen.getByLabelText(/^password$/i), {
        target: { value: 'ValidPass123!' }
      });
      fireEvent.change(screen.getByLabelText(/confirm password/i), {
        target: { value: 'ValidPass123!' }
      });

      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(
          /user already exists/i
        );
      });
    });

    test('handles successful registration', async () => {
      render(<SignupForm />);

      // Reset location mock
      mockLocation.href = 'http://localhost:3000/';
      
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: 'newuser' }
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'new.user@mahindrauniversity.edu.in' }
      });
      fireEvent.change(screen.getByLabelText(/^password$/i), {
        target: { value: 'NewPass123!' }
      });
      fireEvent.change(screen.getByLabelText(/confirm password/i), {
        target: { value: 'NewPass123!' }
      });

      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

      await waitFor(() => {
        expect(window.location.href).toContain('/login?registered=true');
      });
    });
  });
});
