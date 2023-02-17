import is from '@sindresorhus/is';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '.';

type Props = {
  redirectTo: string;
};

const RequireIsAnonymous = ({ redirectTo }: Props) => {
  const state: unknown = useLocation().state;

  const to = is.nonEmptyObject(state) && is.string(state.from) ? state.from : redirectTo;

  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate replace to={to} /> : <Outlet />;
};

export default RequireIsAnonymous;
