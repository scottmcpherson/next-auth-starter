'use client'

import { withClientSideRendering } from '@/common/components/with-client-side-rendering'
import {
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  DocumentIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface SideBarLinkProps {
  href: string
  icon?: JSX.Element
  text?: string
  pathname?: string
}

function SideBarLink({ href, icon, text }: SideBarLinkProps) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center rounded p-2 dark:text-slate-50"
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}

function SideBar() {
  const pathname = usePathname()
  const [sidebarLinks] = useState([
    {
      href: '/dashboard/page',
      text: 'Page',
      icon: <DocumentIcon className="h-6 w-6" />,
    },
    {
      href: '/dashboard/page',
      text: 'Page',
      icon: <DocumentIcon className="h-6 w-6" />,
    },
    {
      href: '/dashboard/page',
      text: 'Page',
      icon: <DocumentIcon className="h-6 w-6" />,
    },
  ])

  return (
    <div
      id="far-left-db-bar"
      className={'flex w-20 flex-col justify-between p-4'}
    >
      <nav className="space-y-4">
        {sidebarLinks.map((link, index) => (
          <div key={link.href}>
            <SideBarLink {...link} pathname={pathname} />
          </div>
        ))}
      </nav>
    </div>
  )
}

export default withClientSideRendering(SideBar)
