// components/Providers.tsx
'use client';

import { RecoilRoot } from 'recoil';
import InitAuth from './InitAuth';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <InitAuth />
      {children}
    </RecoilRoot>
  );
}