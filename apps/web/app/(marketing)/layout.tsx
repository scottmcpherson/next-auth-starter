import Footer from '@/common/components/footer'
import Nav from '@/common/components/nav'
import { AuthContextProvider } from '@/common/contexts/auth-context'

import '../globals.css'

type MarkingLayoutProps = {
  children: React.ReactNode
}

export default function MarkingLayout({ children }: MarkingLayoutProps) {
  return (
    <AuthContextProvider authRequired={false}>
      <Nav />
      {children}
      <Footer />
    </AuthContextProvider>
  )
}
