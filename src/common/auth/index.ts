import { useMemo, useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getRecoil } from 'recoil-nexus';
import { useQueryClient } from '@tanstack/react-query';

import {
  type SignInPayload,
  signIn as signInApi,
  relogin as reloginApi,
  signOut as signOutApi,
} from 'api';

import {
  userIdState,
  tokenState,
  isLoggedInSelector,
  useSetAuthState,
  useResetAuthState,
} from './state';

export { default as RequireIsAnonymous } from './RequireIsAnonymous';
export { default as RequireIsLoggedIn } from './RequireIsLoggedIn';

export const getToken = () => getRecoil(tokenState);

export const useAuth = () => {
  const userId = useRecoilValue(userIdState);
  const token = useRecoilValue(tokenState);
  const isLoggedIn = useRecoilValue(isLoggedInSelector);

  return useMemo(() => ({ userId, token, isLoggedIn }), [userId, token, isLoggedIn]);
};

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const setAuthState = useSetAuthState();

  const signIn = useCallback(
    async (payload: SignInPayload, opts?: { onError?: (error: unknown) => void }) => {
      try {
        setIsLoading(true);
        setAuthState(await signInApi(payload));
      } catch (error: unknown) {
        opts?.onError?.(error);
      } finally {
        setIsLoading(false);
      }
    },
    [setAuthState, setIsLoading]
  );

  return useMemo(() => ({ isLoading, signIn }), [isLoading, signIn]);
};

export const useRelogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const setAuthState = useSetAuthState();
  const resetAuthState = useResetAuthState();

  const relogin = useCallback(async () => {
    try {
      setIsLoading(true);
      setAuthState(await reloginApi());
    } catch {
      resetAuthState();
    } finally {
      setIsLoading(false);
    }
  }, [setAuthState, resetAuthState, setIsLoading]);

  return useMemo(() => ({ isLoading, relogin }), [isLoading, relogin]);
};

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);

  const resetAuthState = useResetAuthState();

  const queryClient = useQueryClient();

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await signOutApi();
    } finally {
      resetAuthState();
      queryClient.removeQueries();
      setIsLoading(false);
    }
  }, [resetAuthState, setIsLoading, queryClient]);

  return useMemo(() => ({ isLoading, signOut }), [isLoading, signOut]);
};
