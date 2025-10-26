'use client';

import { useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message ?? 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message ?? 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-10">
      <div className="rounded-3xl border border-deepNavy/10 bg-white/80 p-8 shadow-2xl backdrop-blur">
        <h1 className="text-3xl font-semibold text-deepNavy">Welcome back</h1>
        <p className="mt-2 text-sm text-deepNavy/60">
          Sign in to continue discovering cinematic Iranian connections across continents.
        </p>
        <form onSubmit={handleEmailSignIn} className="mt-6 space-y-4">
          <label className="block space-y-1 text-sm text-deepNavy">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 shadow-inner focus:border-roseGold focus:outline-none"
            />
          </label>
          <label className="block space-y-1 text-sm text-deepNavy">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-deepNavy/10 bg-white/90 px-4 py-3 shadow-inner focus:border-roseGold focus:outline-none"
            />
          </label>
          {error && <p className="text-xs text-roseGold">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-deepNavy px-6 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <div className="mt-6 text-center text-xs uppercase tracking-[0.4em] text-deepNavy/40">OR</div>
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="mt-4 w-full rounded-full border border-deepNavy/10 bg-white/80 px-6 py-3 text-sm font-semibold text-deepNavy shadow-lg disabled:opacity-50"
        >
          Continue with Google
        </button>
        <p className="mt-6 text-center text-sm text-deepNavy/60">
          Need an account?{' '}
          <Link href="/signup" className="font-semibold text-deepNavy">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
