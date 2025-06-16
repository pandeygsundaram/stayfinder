// components/InitAuth.tsx
'use client';

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '@/atoms/authAtom';

const InitAuth = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`${process.env.BACKEND_URL}/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((user) => {
        setAuth({
          isAuthenticated: true,
          user,
          token,
        });
      })
      .catch(() => {
        localStorage.removeItem('token');
        setAuth({ isAuthenticated: false, user: null, token: null });
      });
  }, []);

  return null;
};

export default InitAuth;
