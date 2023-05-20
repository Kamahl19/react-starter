import { useMemo } from 'react';

import { createRules, passwordRule } from 'common/validations';

export const useChangePasswordRules = () =>
  useMemo(
    () =>
      createRules({
        currentPassword: [{ required: true, type: 'string' }],
        password: [passwordRule],
      }),
    []
  );
