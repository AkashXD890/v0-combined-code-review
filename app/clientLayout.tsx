"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import AuthButtons from "./components/auth-buttons"
import CartButton from "./components/cart-button"
import { CartProvider } from "./components/cart-provider"
import "./globals.css"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [stars, setStars] = useState<Array<{ id: number; left: number; top: number; size: number; delay: number }>>([])

  useEffect(() => {
    // Generate stars
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }))
    setStars(newStars)
  }, [])

  const navigation = [
    { id: "home", label: "Home", href: "/" },
    { id: "hosting", label: "Game Hosting", href: "/hosting" },
    { id: "minecraft", label: "Minecraft", href: "/minecraft" },
    { id: "resources", label: "Resources", href: "/resources" },
    { id: "plugins", label: "Plugins", href: "/plugins" },
    { id: "ranks", label: "Server Ranks", href: "/ranks" },
    { id: "crates", label: "Mystery Crates", href: "/crates" },
    { id: "addons", label: "Add-ons", href: "/addons" },
    { id: "control", label: "Control Panel", href: "/control" },
    { id: "pricing", label: "Pricing", href: "/pricing" },
  ]

  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative">
        <CartProvider>
          {/* Animated Stars Background */}
          <div className="fixed inset-0 pointer-events-none">
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: `${star.delay}s`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>

          {/* Nebula Background Effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* Navigation */}
          <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-lg border-b border-purple-500/20 z-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🦕</span>
                  <span className="text-xl font-bold text-purple-400">Yaddu's Network</span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex space-x-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="px-3 py-2 rounded-lg transition-all duration-200 text-slate-300 hover:text-purple-400 hover:bg-purple-500/5"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Auth Buttons and Cart in Navigation */}
                <div className="hidden lg:flex items-center gap-2">
                  <CartButton />
                  <AuthButtons />
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center gap-2">
                  <CartButton />
                  <button className="p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              {mobileMenuOpen && (
                <div className="lg:hidden py-4 border-t border-purple-500/20">
                  <div className="space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-slate-300 hover:text-purple-400 hover:bg-purple-500/5"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="pt-4 border-t border-purple-500/20 flex justify-center">
                      <AuthButtons />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Main Content */}
          <main className="pt-16 relative z-10">{children}</main>

          {/* Footer */}
          <footer className="relative z-10 bg-slate-900/90 backdrop-blur-lg border-t border-purple-500/20 py-12 px-4 mt-20">
            <div className="max-w-6xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4 text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>Global Network Status: Operational</span>
              </div>
              <p className="text-slate-400">
                © 2025 Yaddu's Network. Soaring through the cosmos of game server excellence.
              </p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
