"use client"

import { useState } from "react"

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Categorías", href: "#categorias" },
  { label: "Nosotros", href: "#nosotros" },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-pastel">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="#inicio" className="font-display text-xl text-primary font-bold">
          Crokangol
        </a>

        <div className="flex items-center gap-1">
          <button
            className="lg:hidden flex flex-col gap-1 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span className={`block w-6 h-0.5 bg-dark transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-6 h-0.5 bg-dark transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-dark transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>

        <div className={`${menuOpen ? "flex" : "hidden"} lg:flex absolute lg:static top-16 left-0 right-0 bg-cream lg:bg-transparent flex-col lg:flex-row items-start lg:items-center gap-1 lg:pb-0 pb-4 pt-2 lg:pt-0 shadow-lg lg:shadow-none`}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm text-dark/70 hover:text-primary font-medium px-4 py-2 rounded-full hover:bg-pastel transition-colors w-full lg:w-auto"
            >
              {link.label}
            </a>
          ))}

          {/* Desktop dropdown */}
          <div className="hidden lg:block relative group">
            <button className="font-body text-sm text-dark/70 hover:text-primary font-medium px-4 py-2 rounded-full hover:bg-pastel transition-colors flex items-center gap-1 cursor-pointer">
              Productos
              <svg className="w-3 h-3 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="absolute top-full left-2 mt-1 bg-white rounded-xl shadow-lg py-2 min-w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <a
                href="#productos"
                className="block font-body text-sm text-dark/70 hover:text-primary font-medium px-4 py-2 hover:bg-pastel transition-colors"
              >
                Destacados
              </a>
              <a
                href="/productos"
                className="block font-body text-sm text-dark/70 hover:text-primary font-medium px-4 py-2 hover:bg-pastel transition-colors"
              >
                Todos
              </a>
            </div>
          </div>

          {/* Mobile dropdown */}
          <div className="lg:hidden w-full">
            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="font-body text-sm text-dark/70 hover:text-primary font-medium px-4 py-2 rounded-full hover:bg-pastel transition-colors flex items-center gap-1 w-full cursor-pointer"
            >
              Productos
              <svg className={`w-3 h-3 mt-0.5 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {mobileProductsOpen && (
              <div className="pl-6 flex flex-col gap-1 mt-1">
                <a
                  href="#productos"
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-sm text-dark/50 hover:text-primary font-medium px-4 py-1.5 rounded-full hover:bg-pastel transition-colors"
                >
                  Destacados
                </a>
                <a
                  href="/productos"
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-sm text-dark/50 hover:text-primary font-medium px-4 py-1.5 rounded-full hover:bg-pastel transition-colors"
                >
                  Todos
                </a>
              </div>
            )}
          </div>

          <a
            href="https://wa.me/5491123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm bg-primary text-white font-semibold px-5 py-2 rounded-full hover:scale-105 transition-transform ml-0 lg:ml-2 mt-2 lg:mt-0"
            onClick={() => setMenuOpen(false)}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </nav>
  )
}
