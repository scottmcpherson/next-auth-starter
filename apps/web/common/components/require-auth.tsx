'use client'

import { useAuth } from '@/common/contexts/auth-context'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [router, user])

  return <>{children}</>
}

export default RequireAuth
