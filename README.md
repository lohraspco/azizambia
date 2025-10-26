# Hamdam — Iranian Connections Platform

Hamdam is a Next.js 14 web application that connects Iranians living in Iran and the United States. It delivers a
cinematic onboarding journey, sophisticated discovery filters, and Firebase-powered chat features designed to support
serious long-distance relationships and immigration readiness.

## ✨ Features
- **Cinematic onboarding** with multi-step forms collecting identity, lifestyle, immigration intent, and compatibility
  preferences.
- **Dual language support** (English/Farsi) with locale toggling and easily extendable translations.
- **Discovery & swiping interface** featuring physics-inspired animations, distance-aware filtering, and immigration
  transparency prompts.
- **Profile management** including Firebase Storage photo uploads, verification toggles, and visibility controls.
- **Real-time messaging** powered by Firestore with typing-ready UI and gradient message bubbles.
- **Authentication** supporting email/password and Google sign-in flows backed by Firebase Auth.
- **Firebase-first architecture** using Firestore for structured data, Storage for media, and optional Cloud Messaging for
  notifications.
- **Warm, elegant design system** driven by Tailwind CSS with rose-gold and lavender gradients inspired by modern dating
  applications.

## 🧱 Tech Stack
- [Next.js 14](https://nextjs.org/) with the App Router
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for cinematic transitions
- [Firebase](https://firebase.google.com/) (Auth, Firestore, Storage)
- [React Hook Form](https://react-hook-form.com/)

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Firebase**
   Create a Firebase project and enable Authentication (email/password + Google), Firestore, and Storage. Copy the web
   app configuration into a `.env.local` file:
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=... 
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000) to explore the cinematic onboarding, discovery, and messaging
   experiences.

## 🧪 Recommended Firebase Security Rules (excerpt)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /profiles/{userId} {
      allow read: if request.auth != null &&
        (resource.data.isVisibleInDiscovery == true || request.auth.uid == userId);
      allow write: if request.auth.uid == userId;
    }

    match /conversations/{conversationId} {
      allow read, write: if request.auth != null && request.auth.uid in resource.data.participants;
    }
  }
}
```

## 📁 Project Structure
```
app/
  (auth)/           # Authentication flows
  (app)/discover/   # Discovery & swipe experience
  (app)/messages/   # Real-time chat threads
  (app)/onboarding/ # Cinematic onboarding journey
  (app)/profile/    # Profile management & verification uploads
  layout.tsx
  page.tsx          # Landing page
components/
  ProfileCard.tsx
  LocaleToggle.tsx
  icons/
lib/
  firebase.ts       # Firebase initialization
  matching.ts       # Discovery helpers & sample data
providers/
  AuthProvider.tsx
  LocaleProvider.tsx
locales/            # English/Farsi translations
```

## 🛣️ Roadmap
- Premium monetisation with boosts, super-likes, and spotlight placements (Stripe or Firebase Extensions).
- In-app video calling using WebRTC with Firebase for signalling.
- AI-powered photo and profile moderation (Google Cloud Vision integration).
- Analytics dashboards via Firebase Analytics or Google Analytics 4.

## 🤝 Contributing
Pull requests are welcome! Please open an issue first to discuss what you would like to change. Ensure coding style and
component aesthetics stay aligned with the warm, cinematic brand.
