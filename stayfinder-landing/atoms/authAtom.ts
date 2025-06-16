'use client';

import { atom } from 'recoil';

type AuthState = {
  isAuthenticated: boolean;
  user: any; // you can replace 'any' with a proper user type later
  token: string | null;
};

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isAuthenticated: false,
    user: null,
    token: null,
  },
});