import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PostHogProvider } from '@/components/providers/posthog-provider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'David Garzon — AI-Native Product & Technology Executive',
    template: '%s | David Garzon',
  },
  description:
    'AI-native Product & Technology executive. Building scalable systems across product, data, automation & growth. Founder mindset. Executive discipline. Systems thinking.',
  metadataBase: new URL('https://davidgarzon.com'),
  openGraph: {
    title: 'David Garzon — AI-Native Product & Technology Executive',
    description:
      'AI-native Product & Technology executive. Building scalable systems across product, data, automation & growth.',
    url: 'https://davidgarzon.com',
    siteName: 'David Garzon',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Garzon — AI-Native Product & Technology Executive',
    description:
      'AI-native Product & Technology executive. Building scalable systems across product, data, automation & growth.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white font-sans antialiased text-gray-900 selection:bg-gray-200`}
      >
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-50/60 via-transparent to-transparent" aria-hidden />
        <PostHogProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  )
}
