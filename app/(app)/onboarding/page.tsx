'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '@/providers/LocaleProvider';
import { Profile } from '@/types/profile';

const steps = ['identity', 'lifestyle', 'intentions', 'preferences', 'summary'] as const;

type OnboardingForm = Pick<
  Profile,
  | 'name'
  | 'age'
  | 'genderIdentity'
  | 'orientation'
  | 'educationLevel'
  | 'occupation'
  | 'incomeBand'
  | 'relationshipIntent'
  | 'interests'
  | 'immigrationIntent'
  | 'wantsToImmigrate'
  | 'willingToSponsorPartner'
  | 'locationCurrent'
  | 'locationOrigin'
  | 'locationPreference'
  | 'agePreference'
  | 'distancePreferenceKm'
  | 'educationPreference'
  | 'incomePreference'
  | 'isVisibleInDiscovery'
  | 'languages'
> & { about: string };

const defaultValues: OnboardingForm = {
  name: '',
  age: 25,
  genderIdentity: 'woman',
  orientation: 'straight',
  educationLevel: 'bachelors',
  occupation: '',
  incomeBand: '40k-60k',
  relationshipIntent: 'serious',
  interests: [],
  about: '',
  immigrationIntent: 'undecided',
  wantsToImmigrate: false,
  willingToSponsorPartner: false,
  locationCurrent: { city: '', country: '' },
  locationOrigin: { city: '', country: '' },
  locationPreference: {},
  agePreference: [24, 36],
  distancePreferenceKm: 8000,
  educationPreference: '',
  incomePreference: '',
  isVisibleInDiscovery: true,
  languages: ['English', 'Farsi']
};

export default function OnboardingPage() {
  const router = useRouter();
  const t = useT();
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex];
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<OnboardingForm>({ defaultValues, mode: 'onBlur' });

  const onSubmit = (values: OnboardingForm) => {
    console.log('onboarding values', values);
    router.push('/discover');
  };

  const progress = useMemo(() => ((stepIndex + 1) / steps.length) * 100, [stepIndex]);

  const nextStep = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
      <header className="flex flex-col gap-2 text-center">
        <span className="text-xs uppercase tracking-[0.5em] text-deepNavy/60">{t('onboarding_title')}</span>
        <h1 className="text-3xl font-semibold text-deepNavy md:text-4xl">Craft your Hamdam presence</h1>
        <p className="mx-auto max-w-2xl text-base text-deepNavy/70">
          Tell us what matters, from professional background to long-distance intentions. Your answers inform cinematic
          matches across Iran and the United States.
        </p>
      </header>

      <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-deepNavy/10">
        <div className="h-full rounded-full bg-gradient-to-r from-roseGold to-lavender transition-all" style={{ width: `${progress}%` }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6 rounded-3xl border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-xl"
          >
            {currentStep === 'identity' && <IdentityStep register={register} errors={errors} />}
            {currentStep === 'lifestyle' && <LifestyleStep register={register} control={control} watch={watch} />}
            {currentStep === 'intentions' && <IntentionsStep register={register} control={control} />}
            {currentStep === 'preferences' && <PreferencesStep register={register} control={control} watch={watch} />}
            {currentStep === 'summary' && <SummaryStep values={watch()} />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <button
            type="button"
            onClick={prevStep}
            disabled={stepIndex === 0}
            className="rounded-full border border-deepNavy/10 bg-white/60 px-6 py-2 text-sm font-medium text-deepNavy/80 disabled:opacity-40"
          >
            {t('back')}
          </button>
          {stepIndex === steps.length - 1 ? (
            <button
              type="submit"
              className="rounded-full bg-deepNavy px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-deepNavy/90"
            >
              Complete onboarding
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="rounded-full bg-gradient-to-r from-roseGold to-lavender px-6 py-3 text-sm font-semibold text-deepNavy shadow-lg"
            >
              {t('continue')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Section({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-deepNavy">{title}</h2>
        <p className="text-sm text-deepNavy/60">{description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function IdentityStep({ register, errors }: any) {
  return (
    <Section title="Identity" description="Share the essentials about yourself.">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-deepNavy">Full name</label>
        <input
          className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 text-sm shadow-inner focus:border-roseGold focus:outline-none"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="text-xs text-roseGold">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-deepNavy">Age</label>
        <input
          type="number"
          className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 text-sm shadow-inner focus:border-roseGold focus:outline-none"
          {...register('age', { valueAsNumber: true, min: 18 })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-deepNavy">Gender identity</label>
        <select
          className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 text-sm shadow-inner focus:border-roseGold focus:outline-none"
          {...register('genderIdentity')}
        >
          <option value="woman">Woman</option>
          <option value="man">Man</option>
          <option value="non-binary">Non-binary</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-deepNavy">Orientation</label>
        <select
          className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 text-sm shadow-inner focus:border-roseGold focus:outline-none"
          {...register('orientation')}
        >
          <option value="straight">Straight</option>
          <option value="gay">Gay</option>
          <option value="lesbian">Lesbian</option>
          <option value="bisexual">Bisexual</option>
        </select>
      </div>
    </Section>
  );
}

function LifestyleStep({ register, control, watch }: any) {
  const languages = watch('languages') ?? [];
  return (
    <Section title="Lifestyle" description="Help matches understand your world.">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-deepNavy">Education level</label>
        <select
          className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 text-sm shadow-inner focus:border-roseGold focus:outline-none"
          {...register('educationLevel')}
        >
          <option value="bachelors">Bachelor&apos;s</option>
          <option value="masters">Master&apos;s</option>
          <option value="phd">PhD</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-deepNavy">Income band</label>
        <select
          className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 text-sm shadow-inner focus:border-roseGold focus:outline-none"
          {...register('incomeBand')}
        >
          <option value="<40k">Under $40k</option>
          <option value="40k-60k">$40k – $60k</option>
          <option value="60k-100k">$60k – $100k</option>
          <option value=">100k">$100k+</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-deepNavy">Languages</label>
        <Controller
          control={control}
          name="languages"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2">
              {['English', 'Farsi', 'Turkish', 'Arabic'].map((language) => {
                const active = languages?.includes(language);
                return (
                  <button
                    type="button"
                    key={language}
                    onClick={() =>
                      field.onChange(
                        active ? languages.filter((item: string) => item !== language) : [...languages, language]
                      )
                    }
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? 'border-transparent bg-gradient-to-r from-roseGold to-lavender text-deepNavy shadow-md'
                        : 'border-deepNavy/10 bg-white/70 text-deepNavy/70'
                    }`}
                  >
                    {language}
                  </button>
                );
              })}
            </div>
          )}
        />
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="text-sm font-medium text-deepNavy">About you</label>
        <textarea
          rows={4}
          className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 text-sm shadow-inner focus:border-roseGold focus:outline-none"
          placeholder="Share your story, ambitions, and lifestyle preferences."
          {...register('about')}
        />
      </div>
    </Section>
  );
}

function IntentionsStep({ register }: any) {
  return (
    <Section title="Intentions" description="Clarify your long-distance goals.">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-deepNavy">Relationship goals</label>
        <select
          className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 text-sm shadow-inner focus:border-roseGold focus:outline-none"
          {...register('relationshipIntent')}
        >
          <option value="serious">Serious relationship</option>
          <option value="friendship">Friendship</option>
          <option value="networking">Networking</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-deepNavy">Immigration intent</label>
        <select
          className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 text-sm shadow-inner focus:border-roseGold focus:outline-none"
          {...register('immigrationIntent')}
        >
          <option value="move_to_us">I want to move to the US</option>
          <option value="move_to_iran">I want to move to Iran</option>
          <option value="support_partner_migration">I plan to sponsor my partner</option>
          <option value="undecided">Still considering options</option>
        </select>
      </div>
      <ToggleField
        label="I am open to immigrating to be with my partner"
        description="Let compatible matches know you&apos;re ready for relocation."
        register={register('wantsToImmigrate')}
      />
      <ToggleField
        label="I can sponsor my partner to the United States"
        description="Highlight your willingness to guide them through the process."
        register={register('willingToSponsorPartner')}
      />
    </Section>
  );
}

function PreferencesStep({ register, control, watch }: any) {
  const agePreference = watch('agePreference');
  return (
    <Section title="Preferences" description="Fine-tune compatibility insights.">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-deepNavy">Preferred age range</label>
        <Controller
          control={control}
          name="agePreference"
          render={({ field }) => (
            <div className="flex items-center gap-3">
              <input
                type="number"
                className="w-full rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 text-sm shadow-inner focus:border-roseGold focus:outline-none"
                value={agePreference?.[0] ?? 18}
                onChange={(event) => field.onChange([Number(event.target.value), agePreference?.[1] ?? 50])}
              />
              <span className="text-sm text-deepNavy/60">to</span>
              <input
                type="number"
                className="w-full rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 text-sm shadow-inner focus:border-roseGold focus:outline-none"
                value={agePreference?.[1] ?? 50}
                onChange={(event) => field.onChange([agePreference?.[0] ?? 18, Number(event.target.value)])}
              />
            </div>
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-deepNavy">Maximum distance (km)</label>
        <input
          type="number"
          className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 text-sm shadow-inner focus:border-roseGold focus:outline-none"
          {...register('distancePreferenceKm', { valueAsNumber: true })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-deepNavy">Education preference</label>
        <input
          className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 text-sm shadow-inner focus:border-roseGold focus:outline-none"
          {...register('educationPreference')}
          placeholder="Master's or above"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-deepNavy">Income preference</label>
        <input
          className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 text-sm shadow-inner focus:border-roseGold focus:outline-none"
          {...register('incomePreference')}
          placeholder="$60k+"
        />
      </div>
      <ToggleField
        label="Appear in discovery"
        description="When off, only people meeting your criteria can find you."
        register={register('isVisibleInDiscovery')}
      />
    </Section>
  );
}

function SummaryStep({ values }: { values: OnboardingForm }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-deepNavy">Review &amp; confirm</h2>
        <p className="text-sm text-deepNavy/60">
          Here&apos;s a snapshot of your Hamdam profile. You can adjust anything before completing.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <SummaryCard title="Identity" items={[values.name, `${values.age} years`, values.genderIdentity]} />
        <SummaryCard
          title="Lifestyle"
          items={[values.educationLevel, values.occupation || 'Occupation TBD', values.languages.join(' • ')]}
        />
        <SummaryCard
          title="Intentions"
          items={[
            values.relationshipIntent,
            values.immigrationIntent,
            values.willingToSponsorPartner ? 'Can sponsor partner' : 'Cannot sponsor partner'
          ]}
        />
        <SummaryCard
          title="Preferences"
          items={[
            `Age ${values.agePreference[0]}–${values.agePreference[1]}`,
            `Distance ≤ ${values.distancePreferenceKm} km`,
            values.educationPreference || 'Flexible education',
            values.incomePreference || 'Flexible income'
          ]}
        />
      </div>
    </section>
  );
}

function SummaryCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-deepNavy/10 bg-white/80 p-6 shadow-md">
      <h3 className="text-sm uppercase tracking-[0.3em] text-deepNavy/60">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-deepNavy/80">
        {items.map((item, index) => (
          <li key={`${title}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ToggleField({ label, description, register }: any) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-deepNavy/10 bg-white/80 p-4 shadow-inner">
      <input type="checkbox" className="mt-1 h-4 w-4 rounded border-deepNavy/30" {...register} />
      <span>
        <span className="block text-sm font-medium text-deepNavy">{label}</span>
        <span className="mt-1 block text-xs text-deepNavy/60">{description}</span>
      </span>
    </label>
  );
}
