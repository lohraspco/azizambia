'use client';

import Link from 'next/link';
import { motion } from '@/components/motion';
import { SparklesIcon } from '@/components/icons/SparklesIcon';
import { LocaleToggle } from '@/components/LocaleToggle';

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-soft-gradient opacity-40" />
      <header className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/60 shadow-glow">
            <SparklesIcon className="h-6 w-6 text-gradient" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-widest text-deepNavy/70">Hamdam</p>
            <p className="text-xs text-deepNavy/60">Real connections. Real compatibility.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <LocaleToggle />
          <Link
            href="/onboarding"
            className="rounded-full bg-deepNavy px-5 py-2 text-white shadow-lg transition hover:bg-deepNavy/90"
          >
            Get Started
          </Link>
        </div>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-12 lg:flex-row lg:items-center">
        <motion.div initial="hidden" animate="visible" variants={heroVariants} transition={{ duration: 0.9 }}>
          <h1 className="text-4xl font-semibold tracking-tight text-deepNavy md:text-5xl lg:text-6xl">
            Bridging hearts across Iran and the United States.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-deepNavy/70">
            Hamdam is designed for long-distance dreamers—professionals, creatives, and romantics committed to finding a
            life partner. Explore cinematic onboarding, dual-language experiences, and intelligent matchmaking across
            continents.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            <FeaturePill title="Dual-language experience" />
            <FeaturePill title="Distance-aware matching" />
            <FeaturePill title="Immigration journey readiness" />
            <FeaturePill title="Verified profiles" />
          </div>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/onboarding"
              className="gradient-border rounded-2xl bg-white/70 px-8 py-3 text-center text-base font-medium text-deepNavy shadow-lg"
            >
              Start your cinematic onboarding
            </Link>
            <Link
              href="/discover"
              className="rounded-2xl border border-deepNavy/10 bg-white/60 px-8 py-3 text-center text-base font-medium text-deepNavy/80"
            >
              Preview matchmaking experience
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto flex max-w-md flex-col gap-6 rounded-3xl bg-white/70 p-6 shadow-2xl backdrop-blur-lg"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-deepNavy/60">Snapshot</p>
          <div className="space-y-4">
            <Stat label="Profiles verified" value="82%" />
            <Stat label="Long-distance matches" value="12k" />
            <Stat label="Daily new conversations" value="4.6k" />
          </div>
          <div className="rounded-2xl bg-deepNavy/90 p-5 text-white shadow-inner">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Promise</p>
            <p className="mt-3 text-lg font-medium">
              We honour modern Iranian love stories with trusted tools, thoughtful prompts, and purposeful design.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function FeaturePill({ title }: { title: string }) {
  return (
    <span className="rounded-full border border-white/40 bg-white/60 px-4 py-2 text-sm text-deepNavy/80 shadow-sm">
      {title}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between rounded-2xl border border-deepNavy/5 bg-white/70 px-5 py-4 shadow-sm">
      <span className="text-sm uppercase tracking-wide text-deepNavy/60">{label}</span>
      <span className="text-2xl font-semibold text-deepNavy">{value}</span>
    </div>
  );
}
