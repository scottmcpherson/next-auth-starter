import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NextAuthStarter - A starter template for NextAuth.js',
  description:
    'NextAuthStarter is a starter template for NextAuth.js that includes everything you need to get started with firebase authentication.',
}

export default function Home() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <main>
        <h2 className="text-3xl">Home Page</h2>
      </main>
    </section>
  )
}
