import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '.';

type Props = {
  redirectTo: string;
};

const RequireIsLoggedIn = ({ redirectTo }: Props) => {
  const { pathname: from } = useLocation();

  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate replace to={redirectTo} state={{ from }} />;
};

export default RequireIsLoggedIn;
