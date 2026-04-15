'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Truck, Shield, RotateCcw, Star, Zap, Package } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80'

const MARQUEE_ITEMS = [
  'Limited Drop 001',
  'Bold by Design',
  'Free Shipping Over $75',
  'Premium 180gsm Cotton',
  'Screen-Printed in the USA',
  'New Drops Monthly',
  'Bold by Design',
  'Limited Drop 001',
  'Free Shipping Over $75',
  'Screen-Printed in the USA',
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', {
      content_name: 'newsletter_signup',
      status: 'submitted',
    })
    setSubscribed(true)
    setNewsletterEmail('')
  }

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0a0a0a]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Graphic tees collection hero"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container-custom flex min-h-[88vh] items-center py-20">
          <div className="max-w-xl animate-fade-in-up">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              <Zap className="h-3 w-3" />
              Drop 001 — Now Live
            </p>
            <h1 className="font-heading text-[5rem] leading-[0.92] text-white sm:text-[7rem] lg:text-[9rem]">
              WEAR THE<br />
              <span className="text-orange-500">NOISE.</span>
            </h1>
            <p className="mt-6 max-w-sm text-base text-white/60 leading-relaxed">
              Graphic tees for those who refuse to blend in. Premium cotton, bold prints, limited runs.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 bg-orange-500 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-orange-600 active:scale-95"
                prefetch={true}
              >
                Shop the Drop
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/collections/drop-001"
                className="inline-flex items-center gap-2.5 border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white/80 transition-all hover:border-white/50 hover:text-white"
                prefetch={true}
              >
                Drop 001
              </Link>
            </div>

            {/* Mini trust */}
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-[#0a0a0a] bg-white/20" />
                ))}
              </div>
              <p className="text-sm text-white/50">
                <span className="font-semibold text-white">1,200+</span> orders shipped this month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE TICKER ───────────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-orange-500/20 bg-orange-500 py-3">
        <div className="marquee-track whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mx-8 text-xs font-bold uppercase tracking-[0.25em] text-white">
              {item}
              <span className="ml-8 inline-block h-1 w-1 rounded-full bg-white/50" />
            </span>
          ))}
        </div>
      </div>

      {/* ─── COLLECTIONS ──────────────────────────────────────────────── */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ─── BRAND STATEMENT ──────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] py-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <p className="text-xs uppercase tracking-[0.25em] text-orange-500 font-semibold">Our Design Process</p>
              <h2 className="font-heading text-[3.5rem] leading-[0.95] text-white sm:text-[4.5rem]">
                EVERY DESIGN<br />
                STARTS WITH<br />
                AN IDEA.
              </h2>
              <p className="text-white/55 leading-relaxed max-w-sm">
                Each graphic is conceptualized and screen-printed by hand using water-based inks that are
                as kind to the environment as they are vivid on fabric. No filler. No fast fashion.
                Just tees worth keeping.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-orange-400 hover:text-orange-300 transition-colors"
                prefetch={true}
              >
                Our Story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="Behind the design process"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 rounded-sm bg-orange-500 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-widest text-white">Screen-Printed</p>
                <p className="text-xs text-white/80">Water-Based Inks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES / TRUST BAR ─────────────────────────────────────── */}
      <section className="border-y py-section-sm">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm bg-orange-500/10">
                <Truck className="h-5 w-5 text-orange-500" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-semibold text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground mt-0.5">On all orders over $75. Fast delivery, tracked.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm bg-orange-500/10">
                <RotateCcw className="h-5 w-5 text-orange-500" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-semibold text-sm">30-Day Returns</p>
                <p className="text-xs text-muted-foreground mt-0.5">Wrong size? No problem. Easy exchanges.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm bg-orange-500/10">
                <Shield className="h-5 w-5 text-orange-500" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-semibold text-sm">Secure Checkout</p>
                <p className="text-xs text-muted-foreground mt-0.5">256-bit SSL encryption on every order.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────────────────────────────── */}
      <section className="py-section">
        <div className="container-custom max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
            <Star className="h-3 w-3" />
            Early Access
          </div>
          <h2 className="font-heading text-[3rem] leading-[0.95] sm:text-[4rem]">
            GET FIRST DIBS<br />ON EVERY DROP.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join the list. Be first to know when new designs drop — and get 10% off your first order.
          </p>
          {subscribed ? (
            <div className="mt-8 inline-flex items-center gap-2 rounded-sm bg-green-500/10 px-6 py-4 text-sm font-semibold text-green-600">
              <Package className="h-4 w-4" />
              You&apos;re on the list. Watch your inbox.
            </div>
          ) : (
            <form className="mt-8 flex gap-0 max-w-md mx-auto" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 border border-r-0 border-foreground/20 bg-transparent px-4 py-3.5 text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-foreground text-background px-6 py-3.5 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
