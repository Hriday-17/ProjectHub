// Signup page for user registration
import { Navbar } from '@/components/navbar';
import { SignupForm } from '@/components/signup-form';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12">
        <SignupForm />
      </main>
    </div>
  );
}
