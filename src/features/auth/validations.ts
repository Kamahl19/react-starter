import { useMemo } from 'react';

import { createRules, passwordRule, emailRule } from 'common/validations';

export const useSignUpRules = () =>
  useMemo(
    () =>
      createRules({
        email: [emailRule],
        password: [passwordRule],
      }),
    []
  );

export const useSignInRules = () =>
  useMemo(
    () =>
      createRules({
        email: [emailRule],
        password: [{ required: true, type: 'string' }],
      }),
    []
  );

export const useForgottenPasswordRules = () =>
  useMemo(
    () =>
      createRules({
        email: [emailRule],
      }),
    []
  );

export const useResetPasswordRules = () =>
  useMemo(
    () =>
      createRules({
        password: [passwordRule],
      }),
    []
  );
