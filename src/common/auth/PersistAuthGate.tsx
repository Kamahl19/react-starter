import { type ReactElement, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { relogin } from 'api';

import { tokenState, isLoggedInSelector, useSetAuthState, useResetAuthState } from './state';

type Props = {
  children: ReactElement;
  loading: ReactElement;
};

const PersistAuthGate = ({ children, loading }: Props) => {
  const setAuthState = useSetAuthState();
  const resetAuthState = useResetAuthState();

  const token = useRecoilValue(tokenState);
  const isLoggedIn = useRecoilValue(isLoggedInSelector);

  useEffect(() => {
    const doRelogin = async () => {
      try {
        setAuthState(await relogin());
      } catch {
        resetAuthState();
      }
    };

    if (token) {
      doRelogin();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (token && !isLoggedIn) {
    return loading;
  }

  return children;
};

export default PersistAuthGate;
