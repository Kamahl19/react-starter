import { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getRecoil } from 'recoil-nexus';
import { useQueryClient } from '@tanstack/react-query';

import { type LoginPayload, login, logout } from 'api';

import {
  userIdState,
  tokenState,
  isLoggedInSelector,
  useSetAuthState,
  useResetAuthState,
} from './state';

export { default as PersistAuthGate } from './PersistAuthGate';
export { default as RequireIsAnonymous } from './RequireIsAnonymous';
export { default as RequireIsLoggedIn } from './RequireIsLoggedIn';

export const useLogin = () => {
  const setAuthState = useSetAuthState();
  const resetAuthState = useResetAuthState();
  const [isLoading, setIsLoading] = useState(false);

  return useMemo(
    () => ({
      isLoading,
      login: async (payload: LoginPayload, { onError }: { onError?: (error: unknown) => void }) => {
        try {
          setIsLoading(true);
          setAuthState(await login(payload));
        } catch (error: unknown) {
          onError?.(error);
          resetAuthState();
        } finally {
          setIsLoading(false);
        }
      },
    }),
    [setAuthState, resetAuthState, setIsLoading, isLoading]
  );
};

export const useLogout = () => {
  const resetAuthState = useResetAuthState();
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  return useMemo(
    () => ({
      isLoading,
      logout: async () => {
        try {
          setIsLoading(true);
          await logout();
        } finally {
          resetAuthState();
          queryClient.removeQueries();
          setIsLoading(false);
        }
      },
    }),
    [queryClient, resetAuthState, setIsLoading, isLoading]
  );
};

export const useAuth = () => {
  const userId = useRecoilValue(userIdState);
  const token = useRecoilValue(tokenState);
  const isLoggedIn = useRecoilValue(isLoggedInSelector);

  return useMemo(() => ({ userId, token, isLoggedIn }), [userId, token, isLoggedIn]);
};

export const getToken = () => getRecoil(tokenState);
