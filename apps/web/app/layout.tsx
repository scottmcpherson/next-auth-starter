import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import Providers from './providers'

import './globals.css'

export const metadata: Metadata = {
  title: 'Next Starter',
  description: 'An opinionated starter template for Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="dark:bg-black/75 bg-slate-50/90">
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
