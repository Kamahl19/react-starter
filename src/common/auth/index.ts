import { useMemo, useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { type SignInPayload } from '@/api';
import { signIn as signInApi, relogin as reloginApi, signOut as signOutApi } from '@/api/endpoints';

import { useAuthState } from './state';

export { default as RequireIsAnonymous } from './RequireIsAnonymous';
export { default as RequireIsLoggedIn } from './RequireIsLoggedIn';

export { getToken } from './state';

export const useAuth = () => useAuthState()[0];

export const useSignIn = () => {
  const [isPending, setIsPending] = useState(false);

  const [, setAuthState] = useAuthState();

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

  const [, setAuthState] = useAuthState();

  const relogin = useCallback(async () => {
    try {
      setIsPending(true);
      setAuthState(await reloginApi());
    } catch {
      setAuthState();
    } finally {
      setIsPending(false);
    }
  }, [setAuthState, setIsPending]);

  return useMemo(() => ({ isPending, relogin }), [isPending, relogin]);
};

export const useSignOut = () => {
  const [isPending, setIsPending] = useState(false);

  const [, setAuthState] = useAuthState();

  const queryClient = useQueryClient();

  const signOut = useCallback(async () => {
    try {
      setIsPending(true);
      await signOutApi();
    } finally {
      setAuthState();
      queryClient.removeQueries();
      setIsPending(false);
    }
  }, [setAuthState, setIsPending, queryClient]);

  return useMemo(() => ({ isPending, signOut }), [isPending, signOut]);
};
