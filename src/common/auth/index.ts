import { useMemo, useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getRecoil } from 'recoil-nexus';
import { useQueryClient } from '@tanstack/react-query';

import {
  type LoginPayload,
  login as loginApi,
  relogin as reloginApi,
  logout as logoutApi,
} from 'api';

import {
  userIdState,
  tokenState,
  isLoggedInSelector,
  isLoginLoadingState,
  isReloginLoadingState,
  isLogoutLoadingState,
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
  const isLoginLoading = useRecoilValue(isLoginLoadingState);
  const isReloginLoading = useRecoilValue(isReloginLoadingState);
  const isLogoutLoading = useRecoilValue(isLogoutLoadingState);

  const setAuthState = useSetAuthState();
  const resetAuthState = useResetAuthState();

  const setIsLoginLoadingState = useSetRecoilState(isLoginLoadingState);
  const setIsReloginLoadingState = useSetRecoilState(isReloginLoadingState);
  const setIsLogoutLoadingState = useSetRecoilState(isLogoutLoadingState);

  const login = useCallback(
    async (payload: LoginPayload, opts?: { onError?: (error: unknown) => void }) => {
      try {
        setIsLoginLoadingState(true);
        setAuthState(await loginApi(payload));
      } catch (error: unknown) {
        opts?.onError?.(error);
      } finally {
        setIsLoginLoadingState(false);
      }
    },
    [setAuthState, setIsLoginLoadingState]
  );

  const relogin = useCallback(async () => {
    try {
      setIsReloginLoadingState(true);
      setAuthState(await reloginApi());
    } catch {
      resetAuthState();
    } finally {
      setIsReloginLoadingState(false);
    }
  }, [setAuthState, resetAuthState, setIsReloginLoadingState]);

  const queryClient = useQueryClient();

  const logout = useCallback(async () => {
    try {
      setIsLogoutLoadingState(true);
      await logoutApi();
    } finally {
      resetAuthState();
      queryClient.removeQueries();
      setIsLogoutLoadingState(false);
    }
  }, [resetAuthState, setIsLogoutLoadingState, queryClient]);

  return useMemo(
    () => ({
      userId,
      token,
      isLoggedIn,
      isLoginLoading,
      isReloginLoading,
      isLogoutLoading,
      login,
      relogin,
      logout,
    }),
    [
      userId,
      token,
      isLoggedIn,
      isLoginLoading,
      isReloginLoading,
      isLogoutLoading,
      login,
      relogin,
      logout,
    ]
  );
};
