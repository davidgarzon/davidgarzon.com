'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/skills', label: 'Skills' },
  { href: '/about', label: 'About' },
  { href: '/agent', label: 'Agent', ping: true },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center mr-4 transition-opacity hover:opacity-80" aria-label="Home">
          <Image src="/logo.png" alt="David Garzón" width={100} height={54} className="h-10 md:h-11 w-auto" priority />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-base font-medium transition-colors flex items-center gap-1.5',
                pathname === item.href
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              )}
            >
              {item.label}
              {item.ping && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500" />
                </span>
              )}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-500 p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="border-b border-gray-100/50 bg-white px-6 pb-4 md:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block py-3 text-base font-medium transition-colors',
                pathname === item.href
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              )}
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  )
}
