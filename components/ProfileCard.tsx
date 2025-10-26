'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Profile } from '@/types/profile';

interface ProfileCardProps {
  profile: Profile;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const cardVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 }
};

export function ProfileCard({ profile, onSwipeLeft, onSwipeRight }: ProfileCardProps) {
  return (
    <motion.article
      className="gradient-border flex h-full flex-col overflow-hidden rounded-3xl bg-white/70 shadow-2xl"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-2/3 w-full overflow-hidden">
        <Image
          src={profile.photoUrls[0] ?? 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}
          alt={profile.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">
              {profile.name}, {profile.age}
            </h3>
            {profile.isProfileVerified && (
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-deepNavy">Verified</span>
            )}
          </div>
          <p className="mt-2 text-sm text-white/80">
            {profile.locationCurrent.city}, {profile.locationCurrent.country}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 text-deepNavy">
        <p className="text-sm text-deepNavy/70">{profile.about}</p>
        <div>
          <h4 className="text-xs uppercase tracking-[0.4em] text-deepNavy/50">Interests</h4>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-gradient-to-r from-roseGold/40 to-lavender/40 px-3 py-1 text-deepNavy/80"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-2 text-xs text-deepNavy/70">
          <InfoRow label="Immigration intent" value={formatIntent(profile.immigrationIntent)} />
          <InfoRow label="Sponsor partner" value={profile.willingToSponsorPartner ? 'Yes' : 'No'} />
          <InfoRow label="Languages" value={profile.languages.join(' • ')} />
          <InfoRow label="Education" value={profile.educationLevel} />
        </div>
        <div className="mt-auto flex items-center justify-between">
          <button
            onClick={onSwipeLeft}
            className="rounded-full border border-deepNavy/10 bg-white/80 px-6 py-2 text-sm font-semibold text-deepNavy/80 shadow-sm"
          >
            Pass
          </button>
          <button
            onClick={onSwipeRight}
            className="rounded-full bg-gradient-to-r from-roseGold to-lavender px-6 py-3 text-sm font-semibold text-deepNavy shadow-lg"
          >
            Connect
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-2">
      <span className="text-[10px] uppercase tracking-[0.3em] text-deepNavy/40">{label}</span>
      <span className="text-sm text-deepNavy/80">{value}</span>
    </div>
  );
}

function formatIntent(intent: Profile['immigrationIntent']) {
  switch (intent) {
    case 'move_to_us':
      return 'Wants to move to the US';
    case 'move_to_iran':
      return 'Open to moving to Iran';
    case 'support_partner_migration':
      return 'Can sponsor partner migration';
    default:
      return 'Considering options';
  }
}
