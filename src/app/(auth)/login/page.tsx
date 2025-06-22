'use client'

import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="bg-[url('/images/musichub-bg.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  )
}