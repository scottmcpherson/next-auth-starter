'use client'

import UserMenu from '@/common/components/user-menu'
import { TOP_NAV_HEIGHT } from '@/common/utils/constants'
import { Bars3Icon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

type TopNavProps = {
  leftBarsExpanded: boolean
  setIsLeftBarExpanded: any
}

export default function TopNav({
  leftBarsExpanded,
  setIsLeftBarExpanded,
}: TopNavProps) {
  return (
    <div
      id="top-bar"
      className={clsx('flex items-center justify-between dark:bg-black mx-4')}
      style={{
        height: `${TOP_NAV_HEIGHT}px`,
        minHeight: `${TOP_NAV_HEIGHT}px`,
      }}
    >
      <div className="flex items-center">
        <button
          onClick={() => setIsLeftBarExpanded(!leftBarsExpanded)}
          className="mr-4 rounded-full bg-theme-gray-900 hover:bg-theme-gray-800 p-2 text-sm text-gray-400"
          aria-label="Toggle left bars"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
      <div className="flex items-center space-x-0">
        <UserMenu />
      </div>
    </div>
  )
}
