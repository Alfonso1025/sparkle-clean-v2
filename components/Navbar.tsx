"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, Menu, X, Phone } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home", anchor: "#hero" },
  { href: "/services", label: "Services", anchor: "#services" },
  { href: "/testimonials", label: "Testimonials", anchor: "#testimonials" },
  { href: "/contact", label: "Contact", anchor: "#contact" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  const getLinkHref = (link: { href: string; anchor: string | null }) => {
    if (isHome && link.anchor) return link.anchor
    return link.href
  }

  return (
    <nav className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-sky-500 transition-colors duration-300 group-hover:text-sky-600" />
            <span className="text-slate-800 font-bold text-xl tracking-wide">
              Sparkle Clean
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getLinkHref(link)}
                className="relative text-slate-500 hover:text-slate-800 transition-colors duration-300 text-base font-medium group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <a
            href="tel:0412345678"
            className="hidden lg:flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300"
          >
            <Phone className="w-4 h-4" />
            <span>0412 345 678</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-slate-500 p-2 hover:text-slate-800 transition-colors duration-300"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-slate-100">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLinkHref(link)}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all duration-300 text-base font-medium py-3 px-4 rounded-md"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 px-4">
                <a
                  href="tel:0412345678"
                  className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300"
                >
                  <Phone className="w-4 h-4" />
                  <span>0412 345 678</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
