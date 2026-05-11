import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { navLinks } from '../data';

export default function Navbar({
  activeSection,
  mobileOpen,
  scrolled,
  onToggleMobile,
  onNavigate,
  onSearch,
  onCart,
}) {
  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? 'bg-ivory/[0.9] shadow-soft' : 'bg-transparent'
        } glass-nav`}
      >
        <div className="luxury-container flex h-20 items-center justify-between">
          <a
            href="#hero"
            onClick={onNavigate}
            className="font-serif text-2xl tracking-[0.22em] text-ink drop-shadow-[0_1px_0_rgba(255,255,255,0.32)]"
          >
            MEBEL
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={onNavigate}
                className={`text-sm font-medium transition-colors ${
                  activeSection === link.id ? 'text-[#1f5d4f]' : 'text-ink/88 hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              aria-label="Search"
              onClick={onSearch}
              className="grid h-11 w-11 place-items-center rounded-full luxury-border bg-white/[0.86] text-ink transition hover:-translate-y-0.5 hover:bg-white"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Cart"
              onClick={onCart}
              className="grid h-11 w-11 place-items-center rounded-full luxury-border bg-white/[0.86] text-ink transition hover:-translate-y-0.5 hover:bg-white"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={onToggleMobile}
            aria-label="Open menu"
            className="grid h-11 w-11 place-items-center rounded-full luxury-border bg-white/[0.86] text-ink transition hover:bg-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ivory"
          >
            <div className="luxury-container flex h-20 items-center justify-between">
              <span className="font-serif text-2xl tracking-[0.22em] text-ink">MEBEL</span>
              <button
                type="button"
                onClick={onToggleMobile}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full luxury-border bg-white/[0.9]"
              >
                <X className="h-5 w-5 text-ink" />
              </button>
            </div>
            <div className="luxury-container flex h-[calc(100vh-5rem)] flex-col justify-between pb-8 pt-10">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={onNavigate}
                    className={`border-b border-ink/10 py-4 font-serif text-3xl transition-colors ${
                      activeSection === link.id ? 'text-[#1f5d4f]' : 'text-ink'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="flex items-center justify-between text-sm text-ink/60">
                <span>Premium Italian furniture</span>
                <span>Tashkent, Uzbekistan</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
