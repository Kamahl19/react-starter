import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '.';

type Props = {
  children: ReactNode;
  redirectTo: string;
};

const RequireIsLoggedIn = ({ redirectTo, children }: Props) => {
  const { pathname: from } = useLocation();

  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <>{children}</> : <Navigate replace to={redirectTo} state={{ from }} />;
};

export default RequireIsLoggedIn;
