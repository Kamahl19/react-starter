import { useMemo } from 'react';

import { PASSWORD_MIN_LENGTH } from 'api';
import { createRules, requiredStringRule } from 'common/validations';

export const useChangePasswordRules = () =>
  useMemo(
    () =>
      createRules({
        currentPassword: [requiredStringRule],
        password: [{ ...requiredStringRule, min: PASSWORD_MIN_LENGTH }],
      }),
    []
  );
