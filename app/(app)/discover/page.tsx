'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from '@/components/motion';
import { calculateDistanceKm, DiscoveryFilters, sampleProfiles } from '@/lib/matching';
import { Profile } from '@/types/profile';
import { ProfileCard } from '@/components/ProfileCard';
import { useAuth } from '@/providers/AuthProvider';

export default function DiscoverPage() {
  const { user, profile } = useAuth();
  const [filters, setFilters] = useState<DiscoveryFilters>({
    gender: 'woman',
    minAge: 24,
    maxAge: 40,
    maxDistanceKm: 10000,
    city: '',
    country: ''
  });
  const [index, setIndex] = useState(0);
  const [matches, setMatches] = useState<Profile[]>([]);

  useEffect(() => {
    const filtered = sampleProfiles.filter((candidate) => {
      if (!candidate.isVisibleInDiscovery || candidate.deletedAt || candidate.deactivatedAt) {
        return false;
      }
      if (filters.gender !== 'any' && candidate.genderIdentity !== filters.gender) {
        return false;
      }
      if (candidate.age < filters.minAge || candidate.age > filters.maxAge) {
        return false;
      }
      if (filters.city && candidate.locationCurrent.city !== filters.city) {
        return false;
      }
      if (filters.country && candidate.locationCurrent.country !== filters.country) {
        return false;
      }
      if (profile?.locationPreference.coordinates && candidate.locationPreference.coordinates) {
        const distance = calculateDistanceKm(
          profile.locationPreference.coordinates,
          candidate.locationPreference.coordinates
        );
        if (distance > filters.maxDistanceKm) {
          return false;
        }
      }
      return true;
    });

    setMatches(filtered);
    setIndex(0);
  }, [filters, profile]);

  const currentProfile = useMemo(() => matches[index], [index, matches]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentProfile) return;
    if (direction === 'right') {
      console.log('Liked profile', currentProfile.id);
    }
    setIndex((prev) => Math.min(prev + 1, matches.length));
  };

  const handleUndo = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10 lg:flex-row">
      <aside className="lg:w-80">
        <div className="rounded-3xl border border-deepNavy/10 bg-white/70 p-6 shadow-xl backdrop-blur">
          <h2 className="text-lg font-semibold text-deepNavy">Discovery filters</h2>
          <p className="mt-1 text-xs text-deepNavy/60">Adjust for distance, age, and location.</p>
          <form className="mt-6 space-y-4 text-sm">
            <label className="block space-y-2">
              <span className="font-medium text-deepNavy">Seeking</span>
              <select
                className="w-full rounded-2xl border border-deepNavy/10 bg-white/80 px-4 py-2 shadow-inner"
                value={filters.gender}
                onChange={(event) => setFilters((prev) => ({ ...prev, gender: event.target.value as any }))}
              >
                <option value="woman">Women</option>
                <option value="man">Men</option>
                <option value="non-binary">Non-binary</option>
                <option value="any">Everyone</option>
              </select>
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-deepNavy">Age range</span>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  className="w-full rounded-2xl border border-deepNavy/10 bg-white/80 px-3 py-2 shadow-inner"
                  value={filters.minAge}
                  onChange={(event) => setFilters((prev) => ({ ...prev, minAge: Number(event.target.value) }))}
                />
                <span className="text-deepNavy/50">to</span>
                <input
                  type="number"
                  className="w-full rounded-2xl border border-deepNavy/10 bg-white/80 px-3 py-2 shadow-inner"
                  value={filters.maxAge}
                  onChange={(event) => setFilters((prev) => ({ ...prev, maxAge: Number(event.target.value) }))}
                />
              </div>
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-deepNavy">Max distance (km)</span>
              <input
                type="number"
                className="w-full rounded-2xl border border-deepNavy/10 bg-white/80 px-3 py-2 shadow-inner"
                value={filters.maxDistanceKm}
                onChange={(event) => setFilters((prev) => ({ ...prev, maxDistanceKm: Number(event.target.value) }))}
              />
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-deepNavy">City</span>
              <input
                className="w-full rounded-2xl border border-deepNavy/10 bg-white/80 px-3 py-2 shadow-inner"
                value={filters.city}
                onChange={(event) => setFilters((prev) => ({ ...prev, city: event.target.value }))}
              />
            </label>
            <label className="block space-y-2">
              <span className="font-medium text-deepNavy">Country</span>
              <input
                className="w-full rounded-2xl border border-deepNavy/10 bg-white/80 px-3 py-2 shadow-inner"
                value={filters.country}
                onChange={(event) => setFilters((prev) => ({ ...prev, country: event.target.value }))}
              />
            </label>
            <button
              type="button"
              onClick={handleUndo}
              className="w-full rounded-full border border-deepNavy/10 bg-white/70 px-4 py-2 text-sm font-medium text-deepNavy shadow-sm"
            >
              Undo last swipe
            </button>
          </form>
        </div>
      </aside>

      <section className="flex flex-1 flex-col items-center justify-center">
        {!user && (
          <div className="mb-6 w-full max-w-xl rounded-3xl border border-deepNavy/10 bg-white/80 p-6 text-center text-deepNavy/70 shadow-md">
            <p className="text-sm">
              Sign in to unlock personalised discovery, immigration intent filters, and to appear in search results for
              compatible members.
            </p>
          </div>
        )}
        <div className="relative h-[560px] w-full max-w-xl">
          <AnimatePresence mode="wait">
            {currentProfile ? (
              <motion.div
                key={currentProfile.id}
                initial={{ opacity: 0, scale: 0.95, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -40 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <ProfileCard
                  profile={currentProfile}
                  onSwipeLeft={() => handleSwipe('left')}
                  onSwipeRight={() => handleSwipe('right')}
                />
              </motion.div>
            ) : (
              <motion.div
                key="finished"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-full items-center justify-center rounded-3xl border border-dashed border-deepNavy/20 bg-white/70"
              >
                <div className="text-center text-deepNavy/60">
                  <p className="text-lg font-semibold">You&apos;re all caught up</p>
                  <p className="mt-2 text-sm">Adjust filters or come back later for more connections.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
