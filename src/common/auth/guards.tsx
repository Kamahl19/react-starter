import { type ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '.';

type Props = {
  children: ReactElement;
  redirectTo: string;
};

export const RequireIsLoggedIn = ({ redirectTo, children }: Props) => {
  const { pathname: from } = useLocation();

  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate replace to={redirectTo} state={{ from }} />;
};

export const RequireIsAnonymous = ({ redirectTo, children }: Props) => {
  const { from: to = redirectTo } = (useLocation().state ?? {}) as { from?: string };

  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate replace to={to} /> : children;
};
