'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  const toggleTheme = () =>
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')

  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="ml-6 flex items-center border-l border-slate-200 pl-6 dark:border-slate-800">
        <label className="sr-only" data-headlessui-state="">
          Theme
        </label>
        <button type="button" onClick={() => {}} className="mt-0.5">
          <MoonIcon className="h-6 w-6 text-slate-600 dark:text-indigo-300" />
        </button>
      </div>
    )
  }

  return (
    <div className="ml-6 flex items-center border-l border-slate-200 pl-6 dark:border-slate-800">
      <label className="sr-only" data-headlessui-state="">
        Theme
      </label>
      <button type="button" onClick={toggleTheme}>
        <MoonIcon className="hidden h-6 w-6 text-slate-600 dark:inline dark:text-indigo-300" />
        <SunIcon className="h-6 w-6 text-slate-600 dark:hidden dark:text-indigo-300" />
      </button>
    </div>
  )
}

export default ThemeSwitcher
