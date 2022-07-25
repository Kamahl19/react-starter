import { useCallback, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getRecoil } from 'recoil-nexus';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

import { type LoginPayload, login, logout } from 'api';

import {
  userIdState,
  tokenState,
  isLoggedInSelector,
  useSetAuthState,
  useResetAuthState,
} from './state';

export { default as PersistAuthGate } from './PersistAuthGate';
export { default as RequireIsAnonymous } from './PersistAuthGate';
export { default as RequireIsLoggedIn } from './RequireIsLoggedIn';

export const useLogin = () => {
  const { t } = useTranslation();

  const setAuthState = useSetAuthState();
  const resetAuthState = useResetAuthState();
  const [isLoading, setIsLoading] = useState(false);

  return useMemo(
    () => ({
      isLoading,
      login: async (payload: LoginPayload) => {
        try {
          setIsLoading(true);

          const data = await login(payload);

          setAuthState(data);
        } catch {
          message.error(t('logIn.failed'));

          resetAuthState();
        } finally {
          setIsLoading(false);
        }
      },
    }),
    [setAuthState, resetAuthState, setIsLoading, t, isLoading]
  );
};

export const useLogout = () => {
  const resetAuthState = useResetAuthState();

  return useCallback(async () => {
    try {
      await logout();
    } finally {
      resetAuthState();

      window.location.reload();
    }
  }, [resetAuthState]);
};

export const useAuth = () => {
  const userId = useRecoilValue(userIdState);
  const token = useRecoilValue(tokenState);
  const isLoggedIn = useRecoilValue(isLoggedInSelector);

  return useMemo(() => ({ userId, token, isLoggedIn }), [userId, token, isLoggedIn]);
};

export const getToken = () => getRecoil(tokenState);
