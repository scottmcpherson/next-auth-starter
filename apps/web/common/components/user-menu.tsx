'use client'

import { useAuth } from '@/common/contexts/auth-context'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import * as Avatar from '@radix-ui/react-avatar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ThemeSelect from './theme-select'

export interface UserMenuProps {}

export default function UserMenu({}: UserMenuProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

  return (
    <ul className="flex items-center gap-x-8">
      {!user ? (
        <>
          <li>
            <Link
              href="/auth/login"
              className="text-slate-900 hover:text-indigo-500 dark:text-slate-100 hover:dark:text-indigo-500"
            >
              Log In
            </Link>
          </li>
          <li>
            <Link
              href="/auth/signup"
              className="text-slate-900 hover:text-indigo-500 dark:text-slate-100 hover:dark:text-indigo-500"
            >
              Sign Up
            </Link>
          </li>
        </>
      ) : (
        <li>
          <div ref={menuRef} className="relative inline-block text-left z-20">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="rounded-full focus:outline-none focus:border-none"
            >
              <div className="w-8 h-8">
                <Avatar.Root className="bg-blackA3 inline-flex w-8 h-8 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                  <Avatar.Image
                    className="w-8 h-8 rounded-[inherit] object-cover"
                    src={user?.photoURL}
                    alt={user?.displayName || 'User'}
                  />
                  <Avatar.Fallback
                    className="leading-1 flex w-8 h-8 items-center justify-center text-[15px] font-medium"
                    delayMs={600}
                  >
                    <UserCircleIcon className="text-gray-900 dark:text-gray-100 w-8 h-8" />
                  </Avatar.Fallback>
                </Avatar.Root>
              </div>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-theme-gray-950 border dark:border-theme-gray-900">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {user ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-theme-gray-900"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-theme-gray-900"
                      >
                        Settings
                      </Link>
                      <div className="border-b dark:border-theme-gray-900"></div>
                      <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-theme-gray-900">
                        <div className="flex justify-between relative">
                          <div>Theme</div>
                          <div>
                            <ThemeSelect />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          router.push('/auth/login')
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-theme-gray-900"
                      >
                        Log in
                      </button>
                      <button
                        onClick={() => {
                          router.push('/auth/signup')
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-theme-gray-900"
                      >
                        Sign up
                      </button>
                    </>
                  )}

                  <div className="border-b dark:border-theme-gray-900"></div>
                  <button
                    onClick={() => {
                      logout()
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-theme-gray-900"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </li>
      )}
    </ul>
  )
}
