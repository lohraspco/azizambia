'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage, firestore } from '@/lib/firebase';
import { useAuth } from '@/providers/AuthProvider';
import { Profile } from '@/types/profile';

interface ProfileEditorForm {
  about: string;
  interests: string;
  locationCurrentCity: string;
  locationCurrentCountry: string;
  isVisibleInDiscovery: boolean;
}

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<ProfileEditorForm>();

  useEffect(() => {
    if (profile) {
      reset({
        about: profile.about ?? '',
        interests: profile.interests.join(', '),
        locationCurrentCity: profile.locationCurrent.city,
        locationCurrentCountry: profile.locationCurrent.country,
        isVisibleInDiscovery: profile.isVisibleInDiscovery
      });
      setPhotoUrl(profile.photoUrls[0] ?? null);
    }
  }, [profile, reset]);

  const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !event.target.files?.[0]) return;
    try {
      setPhotoUploading(true);
      const file = event.target.files[0];
      const storageRef = ref(storage, `profiles/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setPhotoUrl(url);
    } catch (error) {
      console.error('Failed to upload photo', error);
    } finally {
      setPhotoUploading(false);
    }
  };

  const onSubmit = async (values: ProfileEditorForm) => {
    if (!user) return;
    const profileRef = doc(firestore, 'profiles', user.uid);
    const updatedProfile: Partial<Profile> = {
      about: values.about,
      interests: values.interests.split(',').map((item) => item.trim()),
      locationCurrent: {
        city: values.locationCurrentCity,
        country: values.locationCurrentCountry
      },
      isVisibleInDiscovery: values.isVisibleInDiscovery,
      photoUrls: photoUrl ? [photoUrl] : profile?.photoUrls ?? []
    };
    await setDoc(profileRef, updatedProfile, { merge: true });
  };

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-semibold text-deepNavy">Sign in to manage your profile</h1>
        <p className="mt-2 max-w-md text-sm text-deepNavy/60">
          Create an account or sign in to edit your Hamdam presence, upload verification selfies, and control discovery.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.4em] text-deepNavy/50">Profile</span>
        <h1 className="text-3xl font-semibold text-deepNavy">Curate your cinematic presence</h1>
        <p className="text-sm text-deepNavy/60">
          Update your about section, manage discovery settings, and upload verification media to earn trust badges.
        </p>
      </header>

      <section className="grid gap-6 rounded-3xl border border-deepNavy/10 bg-white/70 p-8 shadow-xl backdrop-blur">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative h-40 w-40 overflow-hidden rounded-3xl bg-deepNavy/10">
            {photoUrl ? (
              <Image src={photoUrl} alt="Profile" fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-deepNavy/50">Upload photo</div>
            )}
          </div>
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-roseGold to-lavender px-5 py-2 text-xs font-semibold text-deepNavy shadow-lg">
            {photoUploading ? 'Uploading…' : 'Upload verification selfie'}
            <input type="file" accept="image/*" onChange={uploadPhoto} className="hidden" />
          </label>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 text-sm">
          <label className="space-y-2">
            <span className="font-medium text-deepNavy">About</span>
            <textarea
              rows={4}
              className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 shadow-inner focus:border-roseGold focus:outline-none"
              {...register('about')}
            />
          </label>
          <label className="space-y-2">
            <span className="font-medium text-deepNavy">Interests (comma separated)</span>
            <input
              className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 shadow-inner focus:border-roseGold focus:outline-none"
              {...register('interests')}
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="font-medium text-deepNavy">Current city</span>
              <input
                className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 shadow-inner focus:border-roseGold focus:outline-none"
                {...register('locationCurrentCity')}
              />
            </label>
            <label className="space-y-2">
              <span className="font-medium text-deepNavy">Current country</span>
              <input
                className="rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 shadow-inner focus:border-roseGold focus:outline-none"
                {...register('locationCurrentCountry')}
              />
            </label>
          </div>
          <label className="flex items-start gap-3 rounded-2xl border border-deepNavy/10 bg-white/80 p-4 shadow-inner">
            <input type="checkbox" className="mt-1 h-4 w-4" {...register('isVisibleInDiscovery')} />
            <span>
              <span className="block text-sm font-semibold text-deepNavy">Appear in discovery</span>
              <span className="mt-1 block text-xs text-deepNavy/60">
                When off, only matches who meet your criteria or direct invitations can view your profile.
              </span>
            </span>
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 inline-flex items-center justify-center rounded-full bg-deepNavy px-6 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
          >
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </section>
    </div>
  );
}
