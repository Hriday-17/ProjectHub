// Login page for user authentication
import { Navbar } from "@/components/navbar"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12">
        <LoginForm />
      </main>
    </div>
  )
}
