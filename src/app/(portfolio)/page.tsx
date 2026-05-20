'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Layout, useScrollContainer } from '@/portfolio-components/Layout'
import { useScrollInView } from '@/hooks/use-scroll-in-view'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Section = 'portfolio' | 'notes' | 'about'

type PortfolioItem = {
  slug: string
  title: string
  date: string
  description: string
  thumbnail: string
  role: string
  stack: string[]
  details: string[]
}

type NoteItem = {
  slug: string
  title: string
  date: string
  description: string
  details: string[]
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const portfolioThumbnails = {
  orangeCode:
    'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1806&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  neonLaptop:
    'https://images.unsplash.com/photo-1763568258143-904ea924ac53?auto=format&fit=crop&fm=jpg&q=80&w=1600',
  orangeMug:
    'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1600',
  orangeWorkspace:
    'https://images.pexels.com/photos/34803990/pexels-photo-34803990.jpeg?auto=compress&cs=tinysrgb&w=1600',
}

const portfolioItems: PortfolioItem[] = [
  {
    slug: 'studio-booking',
    title: 'Studio Booking Dashboard',
    date: '2022-04-18',
    description:
      'A compact scheduling flow for creative studios handling inquiries, deposits, and session calendars.',
    thumbnail: portfolioThumbnails.orangeCode,
    role: 'Product design and frontend build',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    details: [
      'Designed a fast overview screen for checking booking status, client notes, and pending confirmations.',
      'Built reusable UI patterns for timeline rows, status badges, and quick action controls.',
      'Kept the interface quiet and dense so repeated daily use feels practical instead of decorative.',
    ],
  },
  {
    slug: 'creator-site',
    title: 'Creator Portfolio System',
    date: '2022-03-29',
    description:
      'A personal site structure for publishing case studies, selected work, and short-form writing from one content model.',
    thumbnail: portfolioThumbnails.orangeMug,
    role: 'Information architecture and interface direction',
    stack: ['Next.js', 'MDX', 'Static content'],
    details: [
      'Mapped portfolio items into a simple data shape that can later move to a CMS without changing the UI.',
      'Created a section-based navigation model so work, notes, and social links stay in one focused surface.',
      'Prioritized scan-friendly cards with enough metadata to decide what to open next.',
    ],
  },
  {
    slug: 'brand-console',
    title: 'Brand Console Prototype',
    date: '2022-02-11',
    description:
      'An internal prototype for managing brand assets, launch copy, and campaign handoff notes.',
    thumbnail: portfolioThumbnails.neonLaptop,
    role: 'Frontend prototype',
    stack: ['React', 'Component systems', 'Design systems'],
    details: [
      'Translated loose operational requirements into a clean prototype for stakeholder review.',
      'Built the main content areas around comparison, filtering, and quick inspection.',
      "Used restrained interaction states so the tool feels polished without getting in the user's way.",
    ],
  },
  {
    slug: 'learning-hub',
    title: 'Learning Hub Redesign',
    date: '2022-01-24',
    description:
      'A refreshed course browsing and lesson flow for a training platform with dense content needs.',
    thumbnail: portfolioThumbnails.orangeWorkspace,
    role: 'Frontend build and UI polish',
    stack: ['WordPress', 'JavaScript', 'Tailwind CSS'],
    details: [
      'Reworked page hierarchy so lessons, resources, and progress states are easier to scan.',
      'Built reusable blocks for course previews, instructor notes, and completion markers.',
      'Improved perceived speed by trimming visual noise and tightening above-the-fold content.',
    ],
  },
  {
    slug: 'commerce-migration',
    title: 'Commerce Migration Toolkit',
    date: '2022-12-08',
    description:
      'A migration support interface for organizing product data, content checks, and launch tasks.',
    thumbnail: portfolioThumbnails.orangeCode,
    role: 'Interface direction',
    stack: ['React', 'CMS', 'E-commerce'],
    details: [
      'Designed migration status views for products, media, content, and redirects.',
      'Created reusable empty, warning, and ready states for operations-heavy workflows.',
      'Kept the UI compact so teams could resolve issues without jumping across tools.',
    ],
  },
  {
    slug: 'marketing-site-system',
    title: 'Marketing Site System',
    date: '2022-10-17',
    description:
      'A modular landing page system for campaign pages, lead capture, and fast iteration.',
    thumbnail: portfolioThumbnails.orangeMug,
    role: 'Design system and build',
    stack: ['Webflow', 'CMS', 'Analytics'],
    details: [
      'Built repeatable content sections for offers, proof, comparison, and inquiry flows.',
      'Aligned visual rules so new pages could ship quickly without feeling templated.',
      'Added tracking-ready CTA patterns for measuring campaign performance.',
    ],
  },
  {
    slug: 'operations-portal',
    title: 'Operations Portal',
    date: '2022-08-04',
    description:
      'A private internal portal for tracking requests, documents, team updates, and approvals.',
    thumbnail: portfolioThumbnails.neonLaptop,
    role: 'Frontend prototype and implementation',
    stack: ['Next.js', 'TypeScript', 'Dashboard UI'],
    details: [
      'Created role-based screen patterns for requests, approvals, and internal notes.',
      'Designed table and detail views for fast repeated use by non-technical teams.',
      'Prepared the UI for future authentication and backend integration.',
    ],
  },
  {
    slug: 'booking-microsite',
    title: 'Booking Microsite',
    date: '2022-06-19',
    description:
      'A lightweight service booking site with clear packages, inquiry capture, and handoff notes.',
    thumbnail: portfolioThumbnails.orangeWorkspace,
    role: 'Design and website build',
    stack: ['WordPress', 'PHP', 'JavaScript'],
    details: [
      'Structured service pages around conversion paths and client questions.',
      'Customized forms and notifications to support faster lead follow-up.',
      'Optimized content blocks for mobile browsing and low-friction inquiries.',
    ],
  },
  {
    slug: 'brand-guidelines-app',
    title: 'Brand Guidelines App',
    date: '2022-04-02',
    description:
      'A compact reference app for colors, typography, components, and downloadable assets.',
    thumbnail: portfolioThumbnails.orangeCode,
    role: 'Product UI and frontend',
    stack: ['React', 'Design tokens', 'Static content'],
    details: [
      'Turned brand rules into a browsable interface with clear usage sections.',
      'Created preview cards for tokens, components, and asset downloads.',
      'Balanced documentation density with a visual presentation that felt designed.',
    ],
  },
  {
    slug: 'client-handoff-space',
    title: 'Client Handoff Space',
    date: '2022-02-12',
    description:
      'A private handoff experience for project files, decisions, notes, and launch status.',
    thumbnail: portfolioThumbnails.orangeMug,
    role: 'Experience design',
    stack: ['Next.js', 'Content model', 'Client portal'],
    details: [
      'Mapped the handoff flow from preview links to launch checklists and final files.',
      'Designed calm status states so clients could understand project progress quickly.',
      'Prepared a structure that can connect to auth and storage later.',
    ],
  },
]

const notes: NoteItem[] = [
  {
    slug: 'portfolio-pages-that-work',
    title: 'Building portfolio pages that do actual work',
    date: '2022-04-30',
    description:
      'A short reflection on replacing generic showcase layouts with pages that explain decisions, constraints, and taste.',
    details: [
      'A strong project page should make the decision-making visible. Screenshots matter, but the useful part is the path: what was unclear, what got simplified, and why the final interface deserves trust.',
      'The best portfolios feel less like a gallery and more like a working surface. They help someone understand how you think before they ever book a call.',
    ],
  },
  {
    slug: 'small-interface-details',
    title: 'Small interface details I keep coming back to',
    date: '2022-03-14',
    description:
      'Notes on spacing, contrast, and navigation patterns that make a digital product feel easier to trust.',
    details: [
      'Small details carry a lot of emotional weight: the distance between labels and values, the way a hover state confirms intent, and whether the interface feels calm under repeated use.',
      'Polish is not decoration here. It is a way of removing tiny moments of doubt.',
    ],
  },
  {
    slug: 'client-confidence',
    title: 'Designing around client confidence',
    date: '2022-02-22',
    description:
      'How clear previews, restrained copy, and visible progress reduce friction during project delivery.',
    details: [
      'Clients rarely need more interface. They usually need clearer status, fewer surprises, and a preview that answers the next obvious question.',
      'Confidence comes from rhythm: show what changed, show what is waiting, and make the next action feel safe.',
    ],
  },
  {
    slug: 'quiet-dashboards',
    title: 'Why dashboards should feel quiet',
    date: '2022-01-09',
    description:
      'A note on making operational screens dense enough for work without turning them into visual noise.',
    details: [
      'A dashboard should not compete with the work. It should hold information in a way that makes comparison, triage, and small decisions feel light.',
      'Quiet screens still need personality, but the personality should live in proportion, typography, contrast, and the right amount of restraint.',
    ],
  },
  {
    slug: 'one-easy-homepage-decision',
    title: 'The homepage should make one decision easy',
    date: '2022-12-18',
    description:
      'Thoughts on simplifying first screens so visitors understand what to inspect, trust, or click next.',
    details: [
      'A homepage does not need to explain everything at once. Its first job is to make one good next step obvious.',
      'When the first screen has a strong point of view, the rest of the site can breathe.',
    ],
  },
  {
    slug: 'small-site-shipping-check',
    title: 'What I check before shipping a small site',
    date: '2022-11-06',
    description:
      'A practical pass through responsive spacing, forms, metadata, speed, content rhythm, and client edits.',
    details: [
      'The final pass is mostly about friction: mobile spacing, form states, tap targets, metadata, image weight, and whether the content still reads naturally after the layout gets real.',
      'A small site can feel expensive when every edge has been looked at once more than expected.',
    ],
  },
  {
    slug: 'cms-structure-interface',
    title: 'CMS structure is part of the interface',
    date: '2022-09-27',
    description:
      'Why a clean editing model matters just as much as the public-facing layout.',
    details: [
      'A CMS is an interface for the person maintaining the site. If the model is confusing, the public UI eventually inherits that confusion.',
      'Clean fields, predictable naming, and flexible but bounded sections help the site age better.',
    ],
  },
  {
    slug: 'visual-polish-usability',
    title: 'When visual polish becomes usability',
    date: '2022-08-15',
    description:
      'Small transitions, focus states, and alignment choices can make an interface feel easier to use.',
    details: [
      'Motion can explain where attention moved. Contrast can tell someone what is available. Alignment can make a dense page feel calmer than it has any right to feel.',
      'Polish becomes usability when it lowers the amount of interpretation a person has to do.',
    ],
  },
  {
    slug: 'case-studies-need-constraints',
    title: 'Case studies need constraints',
    date: '2022-06-03',
    description:
      'A better project writeup explains tradeoffs, goals, and decisions instead of only showing screenshots.',
    details: [
      'Constraints make the work legible. They show what could not be done, what had to be prioritized, and what the design was actually solving.',
      'Without constraints, a case study can look polished while saying very little.',
    ],
  },
  {
    slug: 'private-portals-tone',
    title: 'Private portals need a different tone',
    date: '2022-04-21',
    description:
      'Client-facing workspaces should feel calm, exact, and useful before they feel impressive.',
    details: [
      'A private portal has a different job than a marketing page. It should reduce uncertainty, make files and decisions easy to find, and avoid theatrical UI that slows trust down.',
      'The tone should feel composed: clear status, simple hierarchy, and just enough polish to say the work is cared for.',
    ],
  },
]

const workExperience = [
  {
    period: '2023 - Present',
    company: 'Private company',
    location: 'Missouri',
    role: 'Web Development Manager',
    description:
      'Develops and customizes websites using WordPress and Webflow, handles PHP and JavaScript custom functionality, manages hosting, DNS, email configuration, and Cloudflare setup.',
  },
  {
    period: '2022 - 2023',
    company: 'Private company',
    location: 'Pasay City',
    role: 'Web App Developer',
    description:
      'Designed, developed, tested, and maintained business web applications in collaboration with designers and project managers.',
  },
  {
    period: '2019 - 2022',
    company: 'Private company',
    location: 'Clark, Pampanga',
    role: 'Web Developer',
    description:
      'Designed, developed, and maintained client websites, including over 100 e-commerce sites with custom themes, plugins, and marketing-focused improvements.',
  },
  {
    period: '2017 - 2018',
    company: 'Private company',
    location: 'Quezon City',
    role: 'WordPress Developer',
    description:
      'Built WordPress websites for GoDaddy clients, aligning design and functionality with client goals while maintaining site stability and security.',
  },
  {
    period: '2020 - 2023',
    company: 'Independent work',
    location: 'Freelance',
    role: 'Web App & WordPress Developer / Designer',
    description:
      'Delivered end-to-end freelance projects covering UI design, server and domain setup, development, testing, deployment, and client collaboration.',
  },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/rkingg__/',
    icon: 'instagram',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/rking1696',
    icon: 'facebook',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: 'linkedin',
  },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function SocialIcon({
  icon,
  className,
}: {
  icon: (typeof socialLinks)[number]['icon']
  className?: string
}) {
  if (icon === 'instagram') {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.75 1.5A3.25 3.25 0 0 0 1.5 4.75v6.5a3.25 3.25 0 0 0 3.25 3.25h6.5a3.25 3.25 0 0 0 3.25-3.25v-6.5a3.25 3.25 0 0 0-3.25-3.25h-6.5ZM3 4.75A1.75 1.75 0 0 1 4.75 3h6.5A1.75 1.75 0 0 1 13 4.75v6.5A1.75 1.75 0 0 1 11.25 13h-6.5A1.75 1.75 0 0 1 3 11.25v-6.5ZM8 5.25A2.75 2.75 0 1 0 8 10.75 2.75 2.75 0 0 0 8 5.25ZM6.75 8a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm4.5-2.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        />
      </svg>
    )
  }

  if (icon === 'facebook') {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
        <path
          fill="currentColor"
          d="M16 8.049C16 3.603 12.418 0 8 0S0 3.603 0 8.049C0 12.066 2.925 15.396 6.75 16v-5.624H4.719V8.049H6.75V6.275c0-2.017 1.194-3.132 3.022-3.132.875 0 1.79.157 1.79.157v1.98h-1.008c-.994 0-1.304.62-1.304 1.257v1.512h2.219l-.355 2.327H9.25V16C13.075 15.396 16 12.066 16 8.049Z"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M3.6 5.2H.8V15h2.8V5.2ZM2.2 3.85A1.63 1.63 0 1 0 2.2.6a1.63 1.63 0 0 0 0 3.25ZM15.2 9.6c0-2.64-1.4-4.1-3.44-4.1-1.58 0-2.29.87-2.68 1.48h-.04V5.2H6.36V15h2.8v-4.85c0-1.28.24-2.52 1.83-2.52 1.56 0 1.58 1.46 1.58 2.6V15h2.63V9.6Z"
      />
    </svg>
  )
}

function PrivateCompanyName({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex max-w-full select-none overflow-hidden rounded-[3px] bg-white/8 px-2 py-0.5 align-baseline text-transparent ring-1 ring-white/10">
      <span className="[text-shadow:0_0_8px_rgba(255,255,255,0.25)]">
        {children}
      </span>
      <span className="pointer-events-none absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-white/70" />
      <span className="pointer-events-none absolute inset-x-1 top-[calc(50%+3px)] h-px -translate-y-1/2 bg-white/45" />
      <span className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0,transparent_4px,rgba(255,255,255,0.2)_4px,rgba(255,255,255,0.2)_6px)]" />
    </span>
  )
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`))
}

/* ------------------------------------------------------------------ */
/*  Animation Components                                               */
/* ------------------------------------------------------------------ */

function FadeInSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function HighlightHeading({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.h2
      initial={{ opacity: 0.15 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.h2>
  )
}

function ParallaxImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const scrollContainer = useScrollContainer()
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer || undefined,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <div ref={ref} className={clsx('overflow-hidden', className)}>
      <motion.div style={{ y }} className="relative h-[112%] -mt-[6%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Kept Components                                                    */
/* ------------------------------------------------------------------ */

function FocusItem({
  children,
  index,
  onDist,
}: {
  children: React.ReactNode
  index: number
  onDist?: (index: number, dist: number) => void
}) {
  let scrollRef = useScrollContainer()
  let { ref, distToCenter } = useScrollInView(scrollRef)

  useEffect(() => {
    onDist?.(index, distToCenter)
  }, [distToCenter, index, onDist])

  let isActive = distToCenter < 300

  return (
    <div
      ref={ref}
      className="transition-all duration-500 ease-out group"
      style={{
        opacity: isActive ? 1 : 0.25,
        transform: isActive ? 'translateY(0)' : 'translateY(12px)',
        filter: isActive ? 'blur(0px)' : 'blur(3px)',
      }}
    >
      {children}
    </div>
  )
}

function ThumbnailStrip({
  items,
  activeIndex,
}: {
  items: PortfolioItem[]
  activeIndex: number
}) {
  let thumbW = 56
  let thumbH = 72
  let gap = 6
  let pad = 5
  let frameW = thumbW + pad * 2
  let frameH = thumbH + pad * 2
  let visibleCount = 5
  let containerH = visibleCount * (thumbH + gap) - gap
  let offset = -(activeIndex * (thumbH + gap)) + (containerH / 2) - (thumbH / 2)

  return (
    <div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:block"
      style={{ height: containerH }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-10"
        style={{
          width: frameW,
          height: frameH,
          top: (containerH - frameH) / 2,
        }}
      >
        <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-orange-400" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-orange-400" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-orange-400" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-orange-400" />
      </div>
      <div className="relative w-full h-full" style={{ overflow: 'visible' }}>
        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-50%) translateY(${offset}px)`,
            gap,
            width: thumbW,
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.slug}
              className="relative rounded overflow-hidden shrink-0 transition-all duration-300"
              style={{
                width: thumbW,
                height: thumbH,
                opacity: i === activeIndex ? 1 : 0.3,
                filter: i === activeIndex ? 'none' : 'grayscale(0.6)',
              }}
            >
              <Image
                src={item.thumbnail}
                alt=""
                fill
                className="object-cover"
                sizes={`${thumbW}px`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section Components                                                 */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
            <FadeInSection>
              <h1 className="font-satoshi text-7xl sm:text-8xl font-bold tracking-tight text-white leading-[0.95]">
                RKINGG<span className="text-orange-400">//</span>
              </h1>
            </FadeInSection>
            <FadeInSection delay={0.1}>
              <p className="mt-6 text-xl text-gray-400 max-w-md leading-relaxed">
                We craft digital experiences that inspire and elevate brands
              </p>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <Link
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-lg font-medium text-orange-400 hover:text-orange-300 transition-colors"
              >
                Let's work together
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </FadeInSection>
          </div>
      </div>
    </section>
  )
}

function WorkCard({
  item,
  onOpen,
  index,
}: {
  item: PortfolioItem
  onOpen: (slug: string) => void
  index: number
}) {
  const year = new Date(`${item.date}T00:00:00Z`).getFullYear()

  return (
    <button
      type="button"
      onClick={() => onOpen(item.slug)}
      className="group block w-full text-left"
    >
      <ParallaxImage
        src={item.thumbnail}
        alt=""
        className="aspect-[16/10] w-full rounded-xl"
        sizes="(min-width: 768px) 50vw, 100vw"
        priority={index < 2}
      />
      <div className="mt-4 flex items-center gap-x-3 text-xs font-medium text-gray-500">
        <span>{item.role}</span>
        <span className="h-1 w-1 rounded-full bg-orange-400/70" />
        <span>{year}</span>
      </div>
      <h3 className="mt-2 font-satoshi text-xl font-semibold text-white group-hover:text-orange-400 transition-colors">
        {item.title}
      </h3>
    </button>
  )
}

function WorksSection({
  onOpen,
}: {
  onOpen: (slug: string) => void
}) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="flex w-full justify-center">
          <div className="w-full max-w-4xl">
            <FadeInSection>
              <HighlightHeading className="font-satoshi text-4xl sm:text-5xl font-bold text-white">
                Selected Works
              </HighlightHeading>
            </FadeInSection>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
              {portfolioItems.map((item, index) => (
                <FadeInSection key={item.slug} delay={index * 0.04}>
                  <WorkCard item={item} onOpen={onOpen} index={index} />
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="flex w-full justify-center">
          <div className="w-full max-w-4xl">
            <FadeInSection>
              <HighlightHeading className="font-satoshi text-4xl sm:text-5xl font-bold text-white">
                About
              </HighlightHeading>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed">
                Web developer and designer crafting modern digital experiences.
                Building polished interfaces, seamless interactions, and reliable
                systems.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.15}>
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                  <div className="font-satoshi text-3xl font-bold text-orange-400">
                    8+
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Years Experience
                  </div>
                </div>
                <div>
                  <div className="font-satoshi text-3xl font-bold text-orange-400">
                    100+
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Projects Delivered
                  </div>
                </div>
                <div>
                  <div className="font-satoshi text-3xl font-bold text-orange-400">
                    5+
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Years Freelance
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="mt-16 border-t border-white/10 pt-8">
                <h3 className="font-satoshi text-xl font-semibold text-white">
                  Work Experience
                </h3>
                <div className="mt-6 space-y-6">
                  {workExperience.map((work) => (
                    <article key={`${work.role}-${work.period}`}>
                      <div className="flex flex-wrap items-center gap-x-3 text-xs font-medium text-gray-500">
                        <span>{work.period}</span>
                        <span className="h-1 w-1 rounded-full bg-orange-400/70" />
                        <span>{work.location}</span>
                      </div>
                      <h4 className="mt-1 font-medium text-white">
                        {work.role}
                      </h4>
                      <p className="mt-0.5 text-sm text-orange-400">
                        <PrivateCompanyName>{work.company}</PrivateCompanyName>
                      </p>
                      <p className="mt-2 text-sm text-gray-400">
                        {work.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactFooter() {
  return (
    <section
      id="contact"
      className="py-24 sm:py-32 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="flex w-full justify-center">
          <div className="w-full max-w-2xl">
            <FadeInSection>
              <h2 className="font-satoshi text-4xl sm:text-5xl font-bold text-white">
                Let's work together
              </h2>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <a
                href="mailto:hello@rkingg.com"
                className="mt-6 inline-flex items-center gap-2 text-lg font-medium text-orange-400 hover:text-orange-300 transition-colors"
              >
                hello@rkingg.com
                <span aria-hidden="true">&rarr;</span>
              </a>
            </FadeInSection>

            <FadeInSection delay={0.15}>
              <div className="mt-8 flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/5 text-gray-400 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-orange-400"
                  >
                    <SocialIcon icon={link.icon} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <p className="mt-12 text-sm text-gray-600">
                &copy; {new Date().getFullYear()} RKINGG. All rights reserved.
              </p>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Detail View                                                        */
/* ------------------------------------------------------------------ */

function PortfolioDetail({
  item,
  onBack,
}: {
  item: PortfolioItem
  onBack: () => void
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
      <div className="lg:ml-96 lg:flex lg:w-full lg:justify-end lg:pl-32">
        <div className="mx-auto max-w-lg lg:mx-0 lg:w-0 lg:max-w-xl lg:flex-auto py-20 sm:py-32">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onBack}
              className="inline-flex rounded-lg px-2 py-0.5 text-[0.8125rem]/6 font-medium text-orange-400 transition hover:bg-white/5 hover:text-orange-300"
            >
              &larr; Back to works
            </button>
            <div className="mt-6 overflow-hidden rounded-xl">
              <Image
                src={item.thumbnail}
                alt=""
                width={1600}
                height={900}
                className="aspect-[16/9] w-full object-cover"
                sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 45vw, (min-width: 640px) 32rem, 95vw"
                priority
              />
            </div>
            <div className="mt-6 text-xs font-medium text-gray-500">
              <time dateTime={item.date}>{formatDate(item.date)}</time>
            </div>
            <h2 className="mt-3 font-satoshi text-2xl font-bold text-white">
              {item.title}
            </h2>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              {item.description}
            </p>
            <dl className="mt-8 grid gap-5 border-y border-white/10 py-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-white">Role</dt>
                <dd className="mt-1 text-gray-400">{item.role}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Stack</dt>
                <dd className="mt-1 text-gray-400">
                  {item.stack.join(', ')}
                </dd>
              </div>
            </dl>
            <div className="mt-8 space-y-4 text-sm text-gray-400 leading-relaxed">
              {item.details.map((detail) => (
                <p key={detail}>{detail}</p>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('portfolio')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const dists = useRef<number[]>(new Array(portfolioItems.length).fill(Infinity))

  const worksRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)

  const selectedItem = useMemo(
    () => portfolioItems.find((item) => item.slug === selectedSlug) ?? null,
    [selectedSlug],
  )

  // Track which section is in view for sidebar highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute('data-section') as
              | Section
              | null
            if (section) setActiveSection(section)
          }
        }
      },
      { threshold: 0.3 },
    )

    const el1 = worksRef.current
    const el2 = aboutRef.current
    if (el1) observer.observe(el1)
    if (el2) observer.observe(el2)

    return () => observer.disconnect()
  }, [])

  function handleSelectSection(section: Section) {
    if (selectedSlug) {
      setSelectedSlug(null)
      return
    }
    if (section === 'portfolio' || section === 'notes') {
      worksRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else if (section === 'about') {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* ─── Full-width Inertia sections (NO sidebar) ─── */}
      <HeroSection />
      <WorksSection onOpen={setSelectedSlug} />
      <AboutSection />
      <ContactFooter />

      {/* ─── Divider ─── */}
      <div className="border-t border-white/10 mx-auto max-w-7xl px-6 lg:px-8" />

      {/* ─── Current portfolio WITH sidebar ─── */}
      <Layout
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      >
        {selectedItem ? (
          <PortfolioDetail
            item={selectedItem}
            onBack={() => setSelectedSlug(null)}
          />
        ) : (
          <div className="px-6 lg:px-8">
            <div className="mx-auto max-w-7xl lg:ml-96 lg:pl-32">
              <div className="mx-auto max-w-lg lg:mx-0 lg:w-full">
                <ThumbnailStrip items={portfolioItems} activeIndex={activeIndex} />
                <div className="space-y-14 lg:pt-[18vh] lg:pb-[38vh]">
                  {portfolioItems.map((item, index) => (
                    <FocusItem key={item.slug} index={index} onDist={(i, d) => {
                      dists.current[i] = d
                      let minIdx = 0
                      for (let j = 1; j < dists.current.length; j++) {
                        if (dists.current[j] < dists.current[minIdx]) minIdx = j
                      }
                      setActiveIndex(minIdx)
                    }}>
                      <button
                        type="button"
                        onClick={() => setSelectedSlug(item.slug)}
                        className="block w-full text-left transition duration-500"
                      >
                        <div className="relative overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-900/10 transition hover:ring-orange-400/50 dark:bg-gray-900 dark:ring-white/10">
                          <Image
                            src={item.thumbnail}
                            alt=""
                            width={1600}
                            height={900}
                            className="aspect-[16/9] w-full object-cover transition duration-500 hover:scale-[1.02]"
                            sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 45vw, (min-width: 640px) 32rem, 95vw"
                            priority={index < 2}
                            loading={index < 2 ? undefined : 'lazy'}
                          />
                        </div>
                        <div className="mt-5 flex items-center gap-x-3 text-2xs/4 font-medium text-gray-500 dark:text-white/45">
                          <time dateTime={item.date}>{formatDate(item.date)}</time>
                          <span className="h-1 w-1 rounded-full bg-orange-400/70" />
                          <span>{item.role}</span>
                        </div>
                        <h2 className="mt-3 font-display text-xl/8 font-semibold text-gray-950 transition hover:text-orange-500 dark:text-white">
                          {item.title}
                        </h2>
                        <p className="mt-2 text-sm/6 text-gray-500 dark:text-white/40">
                          {item.description}
                        </p>
                      </button>
                    </FocusItem>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}
