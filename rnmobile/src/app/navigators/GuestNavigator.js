import { StackNavigator } from 'react-navigation';
import {
  LoginContainer,
  SignUpContainer,
  ForgottenPasswordContainer,
  ResetPasswordContainer,
} from '../../features/auth/containers';

export default StackNavigator(
  {
    Login: { screen: LoginContainer },
    SignUp: { screen: SignUpContainer },
    ForgottenPassword: { screen: ForgottenPasswordContainer },
    ResetPassword: { screen: ResetPasswordContainer },
  },
  {
    initialRouteName: 'Login',
  }
);
