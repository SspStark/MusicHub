'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import  Cookies  from 'js-cookie'

export default function RootRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken) {
      router.replace('/home')
    } else {
      router.replace('/login')
    }
  }, [router])

  return null // or a simple loading indicator
}