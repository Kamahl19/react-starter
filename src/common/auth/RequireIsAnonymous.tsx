import { type ReactElement } from 'react';
import is from '@sindresorhus/is';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '.';

type Props = {
  children: ReactElement;
  redirectTo: string;
};

const RequireIsAnonymous = ({ redirectTo, children }: Props) => {
  const { state } = useLocation();

  const to = is.nonEmptyObject(state) && is.string(state.from) ? state.from : redirectTo;

  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate replace to={to} /> : children;
};

export default RequireIsAnonymous;
