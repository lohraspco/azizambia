'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, collection, onSnapshot, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { useAuth } from '@/providers/AuthProvider';
import { ConversationMessage } from '@/types/profile';

export default function MessageThreadPage() {
  const params = useParams<{ matchId: string }>();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [input, setInput] = useState('');

  const conversationId = useMemo(() => params.matchId, [params.matchId]);

  useEffect(() => {
    if (!conversationId) return;
    const messagesRef = collection(doc(firestore, 'conversations', conversationId), 'messages');
    const unsubscribe = onSnapshot(query(messagesRef, orderBy('createdAt', 'asc')), (snapshot) => {
      const items = snapshot.docs.map((message) => ({ id: message.id, ...(message.data() as ConversationMessage) }));
      setMessages(items);
    });
    return () => unsubscribe();
  }, [conversationId]);

  const sendMessage = async () => {
    if (!user || !input.trim()) return;
    const messagesRef = collection(doc(firestore, 'conversations', conversationId), 'messages');
    await addDoc(messagesRef, {
      senderId: user.uid,
      content: input.trim(),
      type: 'text',
      createdAt: serverTimestamp(),
      readBy: [user.uid]
    });
    setInput('');
  };

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-semibold text-deepNavy">Sign in to continue</h1>
        <p className="mt-2 max-w-md text-sm text-deepNavy/60">
          Messaging is available after a mutual match. Sign in to keep conversations and immigration planning in sync.
        </p>
      </div>
    );
  }

  if (!conversationId) {
    return null;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-8">
      <header className="rounded-3xl border border-deepNavy/10 bg-white/80 p-6 shadow-lg">
        <h1 className="text-xl font-semibold text-deepNavy">Conversation</h1>
        <p className="text-sm text-deepNavy/60">Coordinate long-distance romance with clarity.</p>
      </header>
      <section className="mt-6 flex flex-1 flex-col gap-4">
        <div className="flex-1 space-y-3 rounded-3xl border border-deepNavy/10 bg-white/70 p-6 shadow-inner">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow ${
                  message.senderId === user?.uid
                    ? 'bg-gradient-to-r from-roseGold to-lavender text-deepNavy'
                    : 'bg-white text-deepNavy'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 rounded-full border border-deepNavy/10 bg-white/90 px-4 py-2 shadow-lg">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Send a thoughtful note…"
            className="flex-1 bg-transparent text-sm text-deepNavy outline-none"
          />
          <button
            onClick={sendMessage}
            className="rounded-full bg-deepNavy px-4 py-2 text-sm font-semibold text-white shadow"
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
}
