'use client';

import { SessionProvider } from "next-auth/react";
import AuthInit from './InitAuth'
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthInit />
      {children}
    </SessionProvider>
  );
}
