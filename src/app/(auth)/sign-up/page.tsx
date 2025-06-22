'use client'

import SignUpForm from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="bg-[url('/images/musichub-bg.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <SignUpForm />
    </div>
  )
}