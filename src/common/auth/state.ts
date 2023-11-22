import { useMemo } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';

import { store } from '@/app/providers/Jotai';

type AuthState = {
  userId: string;
  token: string | undefined;
};

const initialValue: AuthState = {
  userId: '',
  token: undefined,
};

const userIdAtom = atom(initialValue.userId);

const baseTokenAtom = atom(localStorage.getItem('token') ?? initialValue.token);
const tokenAtom = atom(
  (get) => get(baseTokenAtom),
  (_, set, value: AuthState['token']) => {
    set(baseTokenAtom, value);
    value === undefined
      ? window.localStorage.removeItem('token')
      : window.localStorage.setItem('token', value);
  },
);

const isLoggedInAtom = atom(
  (get) => get(userIdAtom) !== initialValue.userId && get(tokenAtom) !== initialValue.token,
);

export const useAuthState = () => {
  const [userId, setUserId] = useAtom(userIdAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return useMemo(
    () =>
      [
        { userId, token, isLoggedIn },
        ({ userId, token }: AuthState = initialValue) => {
          setUserId(userId);
          setToken(token);
        },
      ] as const,
    [userId, token, isLoggedIn, setUserId, setToken],
  );
};

export const getToken = () => store.get(tokenAtom);
