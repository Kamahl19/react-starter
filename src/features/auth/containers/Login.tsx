import { useLogin } from 'common/auth';

import Login from '../components/Login';

const LoginContainer = () => {
  const { login, isLoading } = useLogin();

  return <Login onSubmit={login} isLoading={isLoading} />;
};

export default LoginContainer;
