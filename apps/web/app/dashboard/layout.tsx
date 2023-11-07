'use client'

import { AuthContextProvider } from '@/common/contexts/auth-context'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthContextProvider authRequired={true}>{children}</AuthContextProvider>
  )
}
