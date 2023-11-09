import { useMemo } from 'react';

import { PASSWORD_MIN_LENGTH } from '@/api';
import { createRules } from '@/common/validations';

const emailRule = {
  required: true,
  type: 'email',
} as const;

const passwordRule = {
  required: true,
  type: 'string',
  min: PASSWORD_MIN_LENGTH,
} as const;

export const useSignUpRules = () =>
  useMemo(
    () =>
      createRules({
        email: [emailRule],
        password: [passwordRule],
      }),
    [],
  );

export const useSignInRules = () =>
  useMemo(
    () =>
      createRules({
        email: [emailRule],
        password: [{ required: true, type: 'string' }],
      }),
    [],
  );

export const useResetPasswordRules = () =>
  useMemo(
    () =>
      createRules({
        email: [emailRule],
      }),
    [],
  );
