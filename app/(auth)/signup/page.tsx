'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message ?? 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-10">
      <div className="rounded-3xl border border-deepNavy/10 bg-white/80 p-8 shadow-2xl backdrop-blur">
        <h1 className="text-3xl font-semibold text-deepNavy">Create your Hamdam account</h1>
        <p className="mt-2 text-sm text-deepNavy/60">
          Join a trusted community of Iranians forging meaningful cross-border relationships.
        </p>
        <form onSubmit={handleSignUp} className="mt-6 space-y-4">
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
            className="w-full rounded-full bg-gradient-to-r from-roseGold to-lavender px-6 py-3 text-sm font-semibold text-deepNavy shadow-lg disabled:opacity-50"
          >
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-deepNavy/60">
          Already have an account?{' '}
          <Link href="/signin" className="font-semibold text-deepNavy">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
