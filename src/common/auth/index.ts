import { useMemo, useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';

import { type SignInPayload } from 'api';
import { signIn as signInApi, relogin as reloginApi, signOut as signOutApi } from 'api/endpoints';
import { getRecoil } from 'app/providers/Recoil';

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
  const [isPending, setIsPending] = useState(false);

  const setAuthState = useSetAuthState();

  const signIn = useCallback(
    async (payload: SignInPayload, opts?: { onError?: (error: unknown) => void }) => {
      try {
        setIsPending(true);
        setAuthState(await signInApi(payload));
      } catch (error: unknown) {
        opts?.onError?.(error);
      } finally {
        setIsPending(false);
      }
    },
    [setAuthState, setIsPending],
  );

  return useMemo(() => ({ isPending, signIn }), [isPending, signIn]);
};

export const useRelogin = () => {
  const [isPending, setIsPending] = useState(false);

  const setAuthState = useSetAuthState();
  const resetAuthState = useResetAuthState();

  const relogin = useCallback(async () => {
    try {
      setIsPending(true);
      setAuthState(await reloginApi());
    } catch {
      resetAuthState();
    } finally {
      setIsPending(false);
    }
  }, [setAuthState, resetAuthState, setIsPending]);

  return useMemo(() => ({ isPending, relogin }), [isPending, relogin]);
};

export const useSignOut = () => {
  const [isPending, setIsPending] = useState(false);

  const resetAuthState = useResetAuthState();

  const queryClient = useQueryClient();

  const signOut = useCallback(async () => {
    try {
      setIsPending(true);
      await signOutApi();
    } finally {
      resetAuthState();
      queryClient.removeQueries();
      setIsPending(false);
    }
  }, [resetAuthState, setIsPending, queryClient]);

  return useMemo(() => ({ isPending, signOut }), [isPending, signOut]);
};
