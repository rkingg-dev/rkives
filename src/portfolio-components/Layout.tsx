'use client'

import { useEffect, useId, useRef, useState, createContext, useContext, useCallback } from 'react'
import clsx from 'clsx'
import Lenis from 'lenis'

import { Intro, IntroFooter } from '@/portfolio-components/Intro'
import { GhostMark } from '@/portfolio-components/Logo'
import { StarField } from '@/portfolio-components/StarField'
import { ThemeToggle } from '@/portfolio-components/ThemeToggle'

type Section = 'portfolio' | 'notes' | 'about'

// Context to provide scroll container ref to children
const ScrollContext = createContext<React.RefObject<HTMLDivElement | null> | null>(null)
export function useScrollContainer() { return useContext(ScrollContext) }

function Glow() {
  let id = useId()

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-lg">
      <svg
        className="absolute -bottom-48 left-[-40%] h-320 w-[180%] lg:top-[-40%] lg:-right-40 lg:bottom-auto lg:left-auto lg:h-[180%] lg:w-7xl"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${id}-desktop`} cx="100%">
            <stop offset="0%" stopColor="rgba(255, 128, 32, 0.34)" />
            <stop offset="53.95%" stopColor="rgba(255, 128, 32, 0.12)" />
            <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
          </radialGradient>
          <radialGradient id={`${id}-mobile`} cy="100%">
            <stop offset="0%" stopColor="rgba(255, 128, 32, 0.34)" />
            <stop offset="53.95%" stopColor="rgba(255, 128, 32, 0.12)" />
            <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id}-desktop)`} className="hidden lg:block" />
        <rect width="100%" height="100%" fill={`url(#${id}-mobile)`} className="lg:hidden" />
      </svg>
      <StarField seed={12} starCount={50} constellationCount={1} ariesCount={1} className="-top-10 -left-60 opacity-65 lg:-top-12 lg:-left-56 lg:w-[68rem]" />
      <StarField seed={29} starCount={40} constellationCount={0} ariesCount={1} className="top-[24%] -left-72 opacity-48 lg:w-[72rem]" />
      <div className="absolute inset-x-0 right-0 bottom-0 h-px bg-white mix-blend-overlay lg:top-0 lg:left-auto lg:h-auto lg:w-px" />
    </div>
  )
}

function FixedSidebar({ main, footer }: { main: React.ReactNode; footer: React.ReactNode }) {
  return (
    <div className="relative flex-none overflow-hidden px-6 lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex lg:px-0">
      <Glow />
      <div className="relative flex w-full lg:pointer-events-auto lg:mr-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-lg lg:overflow-x-hidden lg:overflow-y-auto lg:pl-[max(4rem,calc(50%-38rem))]">
        <div className="mx-auto max-w-lg lg:mx-0 lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1 lg:before:pt-6">
          <div className="pt-20 pb-16 sm:pt-32 sm:pb-20 lg:py-20">
            <div className="relative">{main}</div>
          </div>
          <div className="hidden flex-1 items-end justify-center pb-4 lg:flex lg:pb-6">{footer}</div>
        </div>
      </div>
    </div>
  )
}

function PortfolioIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M2.75 2A1.75 1.75 0 0 0 1 3.75v8.5C1 13.216 1.784 14 2.75 14h10.5A1.75 1.75 0 0 0 15 12.25v-8.5A1.75 1.75 0 0 0 13.25 2H2.75Zm0 1.5h10.5a.25.25 0 0 1 .25.25V5h-11V3.75a.25.25 0 0 1 .25-.25ZM2.5 6.5h11v5.75a.25.25 0 0 1-.25.25H2.75a.25.25 0 0 1-.25-.25V6.5Z" />
    </svg>
  )
}

function NotesIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M3.75 1.5A1.75 1.75 0 0 0 2 3.25v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0 0 14 12.75v-7.4a1.75 1.75 0 0 0-.513-1.237l-2.1-2.1A1.75 1.75 0 0 0 10.15 1.5h-6.4Zm0 1.5h5.75v2.25c0 .69.56 1.25 1.25 1.25H12.5v6.25a.25.25 0 0 1-.25.25h-8.5a.25.25 0 0 1-.25-.25v-9.5A.25.25 0 0 1 3.75 3Zm7.25.56L11.94 5H11a.25.25 0 0 1-.25-.25v-.94c.09.04.174.095.25.17ZM5.25 8a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Zm0 3a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" />
    </svg>
  )
}

function DevIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" {...props}>
      <path d="M5.75 4.25 2 8l3.75 3.75M10.25 4.25 14 8l-3.75 3.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}

function MobileHeader({ visible }: { visible: boolean }) {
  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 border-b border-gray-950/10 bg-white/85 px-4 backdrop-blur-xl transition duration-300 dark:border-white/10 dark:bg-gray-950/85 lg:hidden',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0',
      )}
    >
      <div className="mx-auto flex h-14 max-w-lg items-center justify-center">
        <div className="flex min-w-0 items-center gap-x-2.5">
          <GhostMark className="h-8 w-8 shrink-0" />
          <span className="font-display text-base/6 font-light tracking-[0.08em] text-gray-950 [font-variant-caps:all-small-caps] dark:text-white">rkingg//</span>
        </div>
      </div>
    </header>
  )
}

function MobileFooter({ activeSection, onSelectSection }: { activeSection: Section; onSelectSection?: (section: Section) => void }) {
  let items = [
    { label: 'Selected Work', section: 'portfolio' as const, icon: PortfolioIcon },
    { label: 'Notes', section: 'notes' as const, icon: NotesIcon },
    { label: 'R KINGG', section: 'about' as const, icon: DevIcon },
  ]

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+0.65rem)] lg:hidden">
      <nav className="mx-auto grid max-w-[13rem] grid-cols-3 gap-1 rounded-full border border-orange-300/20 bg-gray-950/60 p-1 shadow-2xl shadow-black/25 backdrop-blur-2xl supports-[backdrop-filter]:bg-gray-950/45">
        {items.map((item) => (
          <button
            key={item.section}
            type="button"
            aria-label={item.label}
            onClick={() => onSelectSection?.(item.section)}
            className={
              activeSection === item.section
                ? 'grid h-10 place-items-center rounded-full bg-orange-300 text-gray-950 shadow-sm shadow-orange-500/30'
                : 'grid h-10 place-items-center rounded-full text-white/55 transition hover:bg-white/8 hover:text-orange-200'
            }
          >
            <item.icon className="h-4.5 w-4.5" />
            <span className="sr-only">{item.label}</span>
          </button>
        ))}
      </nav>
    </footer>
  )
}

export function Layout({
  activeSection = 'portfolio',
  onSelectSection,
  scrollKey,
  children,
}: {
  activeSection?: Section
  onSelectSection?: (section: Section) => void
  scrollKey?: string
  children: React.ReactNode
}) {
  let introRef = useRef<HTMLDivElement>(null)
  let scrollRef = useRef<HTMLDivElement>(null)
  let [showMobileHeader, setShowMobileHeader] = useState(false)

  useEffect(() => {
    function updateMobileHeader() {
      let intro = introRef.current
      if (!intro || window.innerWidth >= 1024) {
        setShowMobileHeader(false)
        return
      }
      let introBottom = intro.offsetTop + intro.offsetHeight
      setShowMobileHeader(window.scrollY >= introBottom - 56)
    }

    updateMobileHeader()
    window.addEventListener('scroll', updateMobileHeader, { passive: true })
    window.addEventListener('resize', updateMobileHeader)
    return () => {
      window.removeEventListener('scroll', updateMobileHeader)
      window.removeEventListener('resize', updateMobileHeader)
    }
  }, [])

  // Smooth scroll to top on section change
  useEffect(() => {
    let scrollContainer = scrollRef.current
    if (!scrollContainer) return
    scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeSection, scrollKey])

  // Lenis smooth scroll
  useEffect(() => {
    let scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      wrapper: scrollContainer,
      content: scrollContainer.firstElementChild as HTMLElement,
    })

    lenis.on('scroll', () => {
      // keep scroll position in sync
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <ScrollContext.Provider value={scrollRef}>
      <div ref={introRef}>
        <FixedSidebar
          main={<Intro activeSection={activeSection} onSelectSection={onSelectSection} />}
          footer={<IntroFooter activeSection={activeSection} onSelectSection={onSelectSection} />}
        />
      </div>
      <MobileHeader visible={showMobileHeader} />
      <div
        ref={scrollRef}
        className="relative flex-auto pb-24 lg:h-screen lg:overflow-y-auto lg:pb-0"
      >
        <main>{children}</main>
      </div>
      <MobileFooter activeSection={activeSection} onSelectSection={onSelectSection} />
    </ScrollContext.Provider>
  )
}
