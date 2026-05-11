import React from 'react';
import { navLinks, socialLinks } from '../data';

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-ink/10 bg-[#f1e8dc]">
      <div className="luxury-container flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="#hero" onClick={onNavigate} className="font-serif text-2xl tracking-[0.22em] text-ink">
            MEBEL
          </a>
          <p className="mt-3 max-w-sm text-sm leading-6 text-ink/66">
            Luxury furniture crafted for calm, architectural interiors and timeless living.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-ink/70">
          {navLinks.map((link) => (
            <a key={link.id} href={link.href} onClick={onNavigate} className="transition hover:text-gold">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="grid h-11 w-11 place-items-center rounded-full luxury-border bg-white/[0.86] text-ink transition hover:-translate-y-0.5 hover:bg-white hover:text-gold"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-ink/10 py-5">
        <div className="luxury-container flex flex-col gap-2 text-xs uppercase tracking-[0.22em] text-ink/45 md:flex-row md:items-center md:justify-between">
          <span>© 2026 MEBEL. All rights reserved.</span>
          <span>Designed for premium interiors</span>
        </div>
      </div>
    </footer>
  );
}
