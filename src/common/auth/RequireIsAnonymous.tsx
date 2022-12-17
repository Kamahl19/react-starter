import { type ReactNode } from 'react';
import is from '@sindresorhus/is';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '.';

type Props = {
  children: ReactNode;
  redirectTo: string;
};

const RequireIsAnonymous = ({ redirectTo, children }: Props) => {
  const state: unknown = useLocation().state;

  const to = is.nonEmptyObject(state) && is.string(state.from) ? state.from : redirectTo;

  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate replace to={to} /> : <>{children}</>;
};

export default RequireIsAnonymous;
