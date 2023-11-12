import Link from 'next/link'
import ThemeSwitch from './theme-switch'
import UserMenu from './user-menu'

export default function Nav() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-sm dark:bg-black/75 bg-slate-50/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex items-center">
              {/* Logo */}
              <Link
                href="/"
                className="text-2xl font-semibold text-slate-900 dark:text-slate-100"
              >
                NextStarter
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <UserMenu />
              {/* <ThemeSwitch /> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
