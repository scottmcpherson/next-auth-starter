'use client'

import { AuthContextProvider } from '@/common/contexts/auth-context'
import { TOP_NAV_HEIGHT } from '@/common/utils/constants'
import { useState } from 'react'
import SideBar from './components/side-bar'
import TopNav from './components/top-nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLeftBarExpanded, setIsLeftBarExpanded] = useState(true)
  return (
    <AuthContextProvider authRequired={true}>
      <div className="flex h-screen flex-col text-slate-900 dark:text-slate-50">
        <TopNav
          leftBarsExpanded={isLeftBarExpanded}
          setIsLeftBarExpanded={setIsLeftBarExpanded}
        />
        <div
          className="flex h-full flex-1"
          style={{
            height: `calc(100vh - ${TOP_NAV_HEIGHT}px)`,
          }}
        >
          {isLeftBarExpanded && <SideBar />}
          {children}
        </div>
      </div>
    </AuthContextProvider>
  )
}
