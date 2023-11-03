import { useCallback } from 'react';
import { atom, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type AuthState = {
  userId: string;
  token?: string;
};

const initialValue = {
  userId: '',
  token: undefined,
} satisfies AuthState;

export const userIdAtom = atom(initialValue.userId);

export const tokenAtom = atomWithStorage<AuthState['token']>(
  'token',
  localStorage.getItem('token') ?? initialValue.token,
);

export const isLoggedInAtom = atom(
  (get) => get(userIdAtom) !== initialValue.userId && get(tokenAtom) !== initialValue.token,
);

export const useSetAuthState = () => {
  const setUserId = useSetAtom(userIdAtom);
  const setToken = useSetAtom(tokenAtom);

  return useCallback(
    ({ userId, token }: AuthState) => {
      setUserId(userId);
      setToken(token);
    },
    [setUserId, setToken],
  );
};

export const useResetAuthState = () => {
  const setAuthState = useSetAuthState();

  return useCallback(() => setAuthState(initialValue), [setAuthState]);
};
