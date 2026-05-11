import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  MapPin,
  Phone,
  Send,
  ShoppingBag,
  Search,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import LuxuryButton from './components/LuxuryButton';
import SectionHeading from './components/SectionHeading';
import StatsBar from './components/StatsBar';
import FeatureCard from './components/FeatureCard';
import Footer from './components/Footer';
import { aboutImage, contactItems, features, heroBackground, navLinks } from './data';

const sectionIds = navLinks.map((item) => item.id);

function useActiveSection() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.15, 0.3, 0.5, 0.75],
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrolled;
}

function SectionFrame({ children, className = '', id }) {
  return (
    <section id={id} className={`relative py-20 sm:py-24 lg:py-28 ${className}`}>
      <div className="luxury-container">{children}</div>
    </section>
  );
}

function SearchPanel({ open, query, setQuery, onClose, results, onPick }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-[#140f0b]/55 px-4 py-6 backdrop-blur-md sm:px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-14 w-full max-w-2xl rounded-[2rem] luxury-border bg-ivory p-5 shadow-luxury"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 rounded-[1.4rem] border border-ink/10 bg-white px-4 py-4 shadow-soft">
              <Search className="h-5 w-5 text-gold" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sahifa yoki bo'lim qidirish..."
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="grid h-10 w-10 place-items-center rounded-full bg-ink text-ivory transition hover:bg-[#140f0b]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 max-h-[60vh] space-y-3 overflow-y-auto no-scrollbar pr-1">
              {results.length ? (
                results.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => onPick(item)}
                    className="flex w-full items-start justify-between gap-4 rounded-[1.35rem] border border-ink/10 bg-white/90 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-soft"
                  >
                    <span>
                      <span className="block font-semibold text-ink">{item.label}</span>
                      <span className="mt-1 block text-sm text-ink/55">{item.hint}</span>
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  </button>
                ))
              ) : (
                <div className="rounded-[1.35rem] border border-ink/10 bg-white/90 p-6 text-sm text-ink/60">
                  Natija topilmadi. Boshqa kalit so'zni sinab ko'ring.
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function CartDrawer({ open, onClose, onGoToCatalog }) {
  const cartItems = ['Luxury sofa collection', 'Marble dining table', 'Custom wardrobe system'];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-[#140f0b]/45 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="ml-auto h-full w-full max-w-md bg-ivory shadow-luxury"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Cart</p>
                <h3 className="mt-2 font-serif text-3xl text-ink">Sizning tanlovingiz</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white text-ink transition hover:bg-[#f7f2ea]"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 px-6 py-6">
              {cartItems.map((item, index) => (
                <div key={item} className="rounded-[1.35rem] border border-ink/10 bg-white/85 p-4 shadow-soft">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-ink">{item}</p>
                      <p className="mt-1 text-sm text-ink/55">Custom order item {index + 1}</p>
                    </div>
                    <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
                      Premium
                    </span>
                  </div>
                </div>
              ))}

              <div className="rounded-[1.35rem] border border-gold/20 bg-[#f7f1e7] p-4">
                <p className="text-sm leading-6 text-ink/75">
                  Cart icon now opens a real panel with selected luxury pieces and a clear next step.
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 border-t border-ink/10 bg-ivory px-6 py-5">
              <LuxuryButton className="w-full" onClick={onGoToCatalog}>
                Katalogga o'tish
              </LuxuryButton>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const activeSection = useActiveSection();
  const scrolled = useScrolled();

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen || cartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen, searchOpen, cartOpen]);

  const navigate = (event) => {
    const href = event.currentTarget.getAttribute('href');
    if (!href?.startsWith('#')) return;
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
  };

  const searchEntries = useMemo(
    () => [
      { label: 'Asosiy', href: '#hero', hint: 'Hero section', target: '#hero' },
      { label: 'Biz haqimizda', href: '#about', hint: 'About section', target: '#about' },
      { label: 'Afzalliklar', href: '#features', hint: 'Premium features', target: '#features' },
      { label: 'Aloqa', href: '#contact', hint: 'Contacts and map', target: '#contact' },
      ...features.map((feature) => ({
        label: feature.title,
        href: '#features',
        hint: feature.description,
        target: '#features',
      })),
    ],
    [],
  );

  const filteredResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return searchEntries;
    return searchEntries.filter(
      (item) => item.label.toLowerCase().includes(q) || item.hint.toLowerCase().includes(q),
    );
  }, [searchEntries, searchQuery]);

  const heroStats = useMemo(
    () => ['Italian-inspired luxury', 'Architectural living spaces', 'Tailored to your interior'],
    [],
  );

  const goToTarget = (target) => {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setSearchOpen(false);
    setCartOpen(false);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen overflow-x-hidden text-ink">
      <Navbar
        activeSection={activeSection}
        mobileOpen={mobileOpen}
        scrolled={scrolled}
        onToggleMobile={() => setMobileOpen((value) => !value)}
        onNavigate={navigate}
        onSearch={() => {
          setSearchQuery('');
          setSearchOpen(true);
        }}
        onCart={() => setCartOpen(true)}
      />

      <SearchPanel
        open={searchOpen}
        query={searchQuery}
        setQuery={setSearchQuery}
        onClose={() => setSearchOpen(false)}
        results={filteredResults}
        onPick={(item) => goToTarget(item.target)}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onGoToCatalog={() => goToTarget('#features')}
      />

      <main>
        <section id="hero" className="relative flex min-h-screen items-end pt-20">
          <div className="absolute inset-0">
            <img src={heroBackground} alt="Luxury interior" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[#18110b]/66" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c130d]/88 via-[#1c130d]/44 to-[#1c130d]/22" />
          </div>

          <div className="relative z-10 w-full pb-14 pt-14 sm:pb-20 lg:pb-24">
            <div className="luxury-container">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-ivory/[0.92] drop-shadow-[0_1px_1px_rgba(0,0,0,0.22)]"
              >
                Premium Italian furniture
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.08 }}
                className="max-w-4xl font-serif text-5xl leading-[0.95] text-ivory drop-shadow-[0_3px_12px_rgba(0,0,0,0.26)] sm:text-7xl lg:text-[6.5rem]"
              >
                Uy emas. Muhit yarating.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="mt-6 max-w-xl text-base leading-8 text-ivory/[0.94] drop-shadow-[0_1px_1px_rgba(0,0,0,0.24)] sm:text-lg"
              >
                MEBEL premium italyan estetikasiga yaqin, sokin, monumental va nafis mebellar
                orqali xonalarni aristokratik muhitga aylantiradi.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.28 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <LuxuryButton href="#features" onClick={navigate} icon={ChevronRight}>
                  Mahsulotlarni ko'rish
                </LuxuryButton>
                <a
                  href="#about"
                  onClick={navigate}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/30 bg-ivory/[0.08] px-6 py-3 text-sm font-semibold text-ivory backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-ivory/50 hover:bg-ivory/[0.12]"
                >
                  Brend haqida
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.38 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                {heroStats.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-ivory/20 bg-ivory/[0.12] px-4 py-2 text-xs tracking-[0.18em] text-ivory/[0.92] backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <StatsBar />

        <SectionFrame id="about" className="pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-[2rem] luxury-border shadow-luxury"
            >
              <img
                src={aboutImage}
                alt="Elegant luxury showroom"
                className="h-[520px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#120d08]/20 via-transparent to-[#b89453]/10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8 }}
            >
              <SectionHeading
                eyebrow="Biz haqimizda"
                title="Nafislik, funksionallik va sokin hashamat."
                description="MEBEL premium interyerlar uchun ishlab chiqilgan. Har bir detal, material va proporsiya zamonaviy uylarni iliq, tartibli va ko'rkam makonga aylantirish uchun tanlanadi."
              />
              <div className="mt-8 h-px w-24 bg-gold" />
              <p className="mt-8 max-w-xl text-sm leading-8 text-ink/74 sm:text-base">
                Bizning yondashuvimiz shunchaki mebel sotish emas. Biz bir butun muhitni quramiz:
                xotirjam rang palitrasi, nozik teksturalar, premium finishlar va estetik
                muvozanat orqali.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <LuxuryButton href="#contact" onClick={navigate} variant="dark">
                  Maslahat olish
                </LuxuryButton>
                <a
                  href="https://instagram.com/mukh.ammadali77"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Instagram
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </SectionFrame>

        <SectionFrame id="features" className="bg-white/[0.18]">
          <SectionHeading
            centered
            eyebrow="Afzalliklar"
            title="Premium tajribani har bir tafsilotda his qiling."
            description="MEBEL kolleksiyasi vizual hashamat, amaliy bardoshlik va shaxsiy buyurtma imkoniyatlarini birlashtiradi."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} index={index} {...feature} />
            ))}
          </div>
        </SectionFrame>

        <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
          <div className="absolute inset-0 bg-[#19120c]" />
          <div className="absolute inset-0 opacity-20">
            <div className="section-grid h-full w-full" />
          </div>
          <div className="relative z-10">
            <div className="luxury-container text-center">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-ivory/60"
              >
                Design your space
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                className="mx-auto max-w-4xl font-serif text-4xl leading-tight text-ivory sm:text-5xl lg:text-6xl"
              >
                Mukammal interyerni bugundan boshlang
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.1 }}
                className="mt-10"
              >
                <LuxuryButton href="#contact" onClick={navigate}>
                  Katalogga o'tish
                </LuxuryButton>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionFrame id="contact">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow="Aloqa"
                title="Shaxsiy konsultatsiya uchun bog'laning."
                description="Biz sizga material tanlovi, o'lcham, rang palitrasi va interyerga moslashtirish bo'yicha premium yordam beramiz."
              />

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {contactItems.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    className="group flex items-start gap-4 rounded-[1.5rem] luxury-border bg-white/[0.88] p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-luxury"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold/10 text-gold transition group-hover:bg-gold group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="pt-1 text-sm leading-6 text-ink/78">{label}</span>
                  </a>
                ))}
              </div>

              <div className="mt-8 rounded-[2rem] luxury-border bg-white/[0.88] p-6 shadow-soft">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    className="h-14 rounded-full border border-ink/10 bg-ivory/70 px-5 text-sm outline-none transition placeholder:text-ink/35 focus:border-gold/40 focus:bg-white"
                    placeholder="Ismingiz"
                  />
                  <input
                    className="h-14 rounded-full border border-ink/10 bg-ivory/70 px-5 text-sm outline-none transition placeholder:text-ink/35 focus:border-gold/40 focus:bg-white"
                    placeholder="Telefon raqamingiz"
                  />
                </div>
                <textarea
                  rows="5"
                  className="mt-4 w-full rounded-[1.5rem] border border-ink/10 bg-ivory/70 px-5 py-4 text-sm outline-none transition placeholder:text-ink/35 focus:border-gold/40 focus:bg-white"
                  placeholder="Qisqacha talabingizni yozing"
                />
                <div className="mt-5 flex flex-wrap gap-3">
                  <LuxuryButton icon={Send}>So'rov yuborish</LuxuryButton>
                  <a
                    href="tel:+998959598878"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-[#f7f2ea]"
                  >
                    Qo'ng'iroq qilish
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8 }}
              className="rounded-[2rem] luxury-border bg-white/[0.9] p-4 shadow-luxury"
            >
              <div className="relative h-full min-h-[620px] overflow-hidden rounded-[1.5rem] bg-[#d9d1c6]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(31,93,79,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.26),rgba(255,255,255,0.02))]" />
                <div className="absolute inset-0 section-grid opacity-35" />
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1600&q=80"
                    alt="Luxury map preview background"
                    className="h-full w-full object-cover opacity-28 mix-blend-multiply"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white/[0.92] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink shadow-soft">
                      Yandex map
                    </span>
                    <a
                      href="https://yandex.com/maps/?text=Salarbuyi%20Street%2047%2C%20Tashkent"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-emerald px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#184b40]"
                    >
                      Open in Yandex
                    </a>
                  </div>

                  <div className="ml-auto max-w-xs rounded-[1.5rem] bg-white/[0.94] p-5 shadow-luxury backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <MapPin className="h-4 w-4 text-gold" />
                      Salarbuyi Street 47, Tashkent 1000520
                    </div>
                    <p className="mt-3 text-sm leading-6 text-ink/78">
                      Direct Yandex navigation is available from this card. The interactive embed is
                      replaced with a clean premium preview because the external iframe is blocked
                      in-browser.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </SectionFrame>
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
