// components/Providers.tsx
'use client';

import AuthInit from './InitAuth'
import { Navbar } from '@/components/navbar';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthInit />
      <Navbar />
      {children}
    </>
  );
}