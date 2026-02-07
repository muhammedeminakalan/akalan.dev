import { Metadata } from 'next'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ThemeProvider from '@/components/theme-provider'
import { fontVariables } from '@/lib/fonts'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Muhammed Emin Akalan',
  description:
    'Muhammed Emin Akalan - Full Stack Engineer. Modern web teknolojileri ile kullanıcı odaklı, ölçeklenebilir uygulamalar geliştiren yazılım mühendisi.'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="tr" suppressHydrationWarning className={fontVariables}>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
