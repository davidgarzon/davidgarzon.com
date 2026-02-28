import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto pt-8 px-6 pb-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col text-center md:text-left">
          <Link href="/" className="text-base font-medium tracking-tight leading-tight text-gray-900 hover:opacity-80">
            David Garzón
          </Link>
          <span className="text-sm text-gray-500 mt-1">AI-Native Product Builder · Barcelona</span>
        </div>

        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} David Garzon
        </div>
      </div>
    </footer>
  )
}
