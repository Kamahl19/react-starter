import { useMemo } from 'react';

import { PASSWORD_MIN_LENGTH } from 'api';
import { createRules, requiredStringRule, requiredEmailRule } from 'common/validations';

export const useSignUpRules = () =>
  useMemo(
    () =>
      createRules({
        email: [requiredEmailRule],
        password: [{ ...requiredStringRule, min: PASSWORD_MIN_LENGTH }],
      }),
    []
  );

export const useLoginRules = () =>
  useMemo(
    () =>
      createRules({
        email: [requiredEmailRule],
        password: [requiredStringRule],
      }),
    []
  );

export const useForgottenPasswordRules = () =>
  useMemo(
    () =>
      createRules({
        email: [requiredEmailRule],
      }),
    []
  );

export const useResetPasswordRules = () =>
  useMemo(
    () =>
      createRules({
        password: [{ ...requiredStringRule, min: PASSWORD_MIN_LENGTH }],
      }),
    []
  );
