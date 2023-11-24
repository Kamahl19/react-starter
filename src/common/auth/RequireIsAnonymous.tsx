import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '.';

type Props = {
  redirectTo: string;
};

const RequireIsAnonymous = ({ redirectTo }: Props) => {
  const to = parseTo(useLocation().state) ?? redirectTo;

  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate replace to={to} /> : <Outlet />;
};

export default RequireIsAnonymous;

const hasFrom = (state: unknown): state is { from: string } =>
  typeof state === 'object' && state !== null && 'from' in state && typeof state.from === 'string';

const parseTo = (state: unknown) => (hasFrom(state) ? state.from : undefined);
