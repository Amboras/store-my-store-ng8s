'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Zap,
  Package,
  Award,
  Lock,
  CheckCircle,
  Flame,
} from 'lucide-react'
import { useProducts } from '@/hooks/use-products'

// Curated brand imagery
const HERO_IMAGE = 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&q=90'
const LIFESTYLE_1 = 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1400&q=90'
const LIFESTYLE_2 = 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1400&q=90'
const PROCESS_IMAGE = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&q=90'

const MARQUEE_ITEMS = [
  'Drop 001 — Now Live',
  'Premium 220gsm Cotton',
  'Screen-Printed in the USA',
  'Free Shipping Over $75',
  'Bold by Design',
  'Limited Quantities',
  'Water-Based Inks',
  'Drop 001 — Now Live',
  'Premium 220gsm Cotton',
  'Free Shipping Over $75',
]

function CountdownTimer() {
  const end = new Date()
  end.setHours(end.getHours() + 47, end.getMinutes() + 23, 0, 0)

  const [timeLeft, setTimeLeft] = useState({ h: 47, m: 23, s: 0 })

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const diff = Math.max(0, end.getTime() - now.getTime())
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <span className="tabular-nums font-mono font-bold text-orange-500">
      {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
    </span>
  )
}

export default function HomePage() {
  const { data: products } = useProducts({ limit: 4 })
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    setSubscribed(true)
    setNewsletterEmail('')
  }

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#080808] min-h-[92vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Bold graphic tee collection"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
        </div>

        <div className="relative container-custom py-24 w-full">
          <div className="max-w-2xl animate-fade-in-up">
            {/* Urgency pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              <Flame className="h-3 w-3" />
              Drop 001 — Ends in&nbsp;<CountdownTimer />
            </div>

            <h1 className="font-heading text-[5.5rem] leading-[0.88] text-white sm:text-[7rem] lg:text-[9.5rem] tracking-tight">
              WEAR YOUR<br />
              <span className="text-orange-500">VISION.</span>
            </h1>

            <p className="mt-6 max-w-sm text-base text-white/55 leading-relaxed">
              Your designs. Premium 220gsm cotton. Screen-printed with water-based inks that last.
              Turn your creativity into wearable art.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 bg-orange-500 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-orange-400 active:scale-95"
              >
                Shop the Drop
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products/the-founders-2-pack-drop-001"
                className="inline-flex items-center gap-2.5 border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white/80 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white backdrop-blur-sm"
              >
                Founders Bundle — Save $12
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <span className="text-xs text-white/50">4.9 / 5 from 600+ customers</span>
              </div>
              <div className="h-3 w-px bg-white/15 hidden sm:block" />
              <span className="text-xs text-white/40">
                <span className="text-white font-semibold">2,400+</span> tees delivered this season
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE TICKER ─────────────────────────────────────────────── */}
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

      {/* ─── PRODUCTS GRID ──────────────────────────────────────────────── */}
      <section className="py-section bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-orange-500 font-semibold mb-2">Drop 001</p>
              <h2 className="font-heading text-[3rem] leading-none text-white sm:text-[4rem]">
                THE COLLECTION
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products && products.length > 0 ? products.map((product: any, i: number) => (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#151515]">
                  {product.thumbnail ? (
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {i === 0 && (
                    <div className="absolute top-3 left-3 bg-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      Best Seller
                    </div>
                  )}
                  {i === 1 && (
                    <div className="absolute top-3 left-3 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                      Save $12
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-4">
                    <span className="block w-full bg-orange-500 py-3 text-center text-xs font-bold uppercase tracking-widest text-white">
                      Quick Shop
                    </span>
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/50">
                      {product.variants?.[0]?.calculated_price?.calculated_amount
                        ? `$${(product.variants[0].calculated_price.calculated_amount / 100).toFixed(2)}`
                        : product.variants?.length
                        ? `From $${(Math.min(...product.variants.map((v: any) => v.calculated_price?.calculated_amount || 9999)) / 100).toFixed(2)}`
                        : ''}
                    </p>
                    <span className="text-[10px] uppercase tracking-widest text-white/30">
                      {product.variants?.length} sizes
                    </span>
                  </div>
                </div>
              </Link>
            )) : (
              // Skeleton cards while loading
              [1,2,3,4].map(i => (
                <div key={i} className="space-y-3">
                  <div className="aspect-[3/4] bg-[#151515] animate-pulse" />
                  <div className="h-4 bg-[#151515] animate-pulse rounded w-3/4" />
                  <div className="h-3 bg-[#151515] animate-pulse rounded w-1/3" />
                </div>
              ))
            )}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── LIFESTYLE EDITORIAL ────────────────────────────────────────── */}
      <section className="py-section bg-[#080808]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden group">
              <Image
                src={LIFESTYLE_1}
                alt="Wear your vision"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-1">Designed for</p>
                <h3 className="font-heading text-3xl text-white">THE BOLD ONES</h3>
              </div>
            </div>
            <div className="space-y-5">
              <div className="relative aspect-[4/3] overflow-hidden group">
                <Image
                  src={LIFESTYLE_2}
                  alt="Premium tees lifestyle"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-1">Premium quality</p>
                  <h3 className="font-heading text-3xl text-white">220GSM COTTON</h3>
                </div>
              </div>
              <div className="bg-orange-500 p-8 flex flex-col justify-center">
                <Award className="h-8 w-8 text-white mb-4" strokeWidth={1.5} />
                <h3 className="font-heading text-3xl text-white mb-2">YOUR DESIGN.<br />OUR CRAFT.</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Every graphic is screen-printed by hand using water-based inks built to outlast a thousand washes.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:gap-3 transition-all"
                >
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY ─────────────────────────────────────────────────── */}
      <section className="py-section bg-[#0a0a0a]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-7">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-orange-500 font-semibold mb-4">Our process</p>
                <h2 className="font-heading text-[3.5rem] leading-[0.95] text-white sm:text-[4.5rem]">
                  EVERY DROP<br />STARTS WITH<br />
                  <span className="text-orange-500">A SKETCH.</span>
                </h2>
              </div>
              <p className="text-white/50 leading-relaxed max-w-sm">
                We work with independent artists to transform raw ideas into limited-run wearable pieces.
                No reprints. No restocks. When a drop sells out — it&apos;s gone.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-2">
                <div>
                  <p className="font-heading text-4xl text-orange-500">220gsm</p>
                  <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">Premium Cotton Weight</p>
                </div>
                <div>
                  <p className="font-heading text-4xl text-orange-500">100%</p>
                  <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">Water-Based Inks</p>
                </div>
                <div>
                  <p className="font-heading text-4xl text-orange-500">30-Day</p>
                  <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">Free Returns</p>
                </div>
                <div>
                  <p className="font-heading text-4xl text-orange-500">USA</p>
                  <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">Screen-Printed</p>
                </div>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-orange-400 hover:text-orange-300 transition-colors"
              >
                Our Story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={PROCESS_IMAGE}
                alt="Screen printing process"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 bg-orange-500 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-widest text-white">Hand Screen-Printed</p>
                <p className="text-xs text-white/75 mt-0.5">Each tee, individually</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ──────────────────────────────────────────────────── */}
      <section className="border-y border-white/5 py-section-sm bg-[#0d0d0d]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $75' },
              { icon: RotateCcw, title: '30-Day Returns', desc: 'Hassle-free exchanges' },
              { icon: Shield, title: 'Secure Checkout', desc: '256-bit SSL encryption' },
              { icon: Lock, title: 'Safe Payments', desc: 'Visa, MC, Apple Pay' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm bg-orange-500/10">
                  <Icon className="h-5 w-5 text-orange-500" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">{title}</p>
                  <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─────────────────────────────────────────────────── */}
      <section className="py-section bg-[#0a0a0a]">
        <div className="container-custom max-w-xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400 mb-5">
            <Zap className="h-3 w-3" />
            Early Access
          </div>
          <h2 className="font-heading text-[3rem] leading-[0.95] text-white sm:text-[4rem]">
            GET FIRST DIBS<br />ON EVERY DROP.
          </h2>
          <p className="mt-4 text-white/45 text-sm leading-relaxed">
            Join the list. Be first when new designs land — and unlock 10% off your first order.
          </p>

          {subscribed ? (
            <div className="mt-8 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-6 py-4 text-sm font-semibold text-green-400">
              <CheckCircle className="h-4 w-4" />
              You&apos;re on the list. Watch your inbox.
            </div>
          ) : (
            <form className="mt-8 flex max-w-md mx-auto gap-0" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 border border-r-0 border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-orange-500/50 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-orange-400 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-white/25">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  )
}
