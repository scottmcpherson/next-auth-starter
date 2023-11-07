'use client'

import { useTheme } from 'next-themes'

export default function ThemeSelect() {
  const { theme, setTheme } = useTheme()
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value)
  }

  return (
    <select
      onChange={handleChange}
      value={theme}
      className="bg-transparent text-xs h-6 py-0.5 rounded dark:border-theme-gray-900 focus:outline-none"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  )
}
