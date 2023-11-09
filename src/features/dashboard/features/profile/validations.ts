import { useMemo } from 'react';

import { PASSWORD_MIN_LENGTH } from '@/api';
import { createRules } from '@/common/validations';

export const useChangePasswordRules = () =>
  useMemo(
    () =>
      createRules({
        password: [{ required: true, type: 'string', min: PASSWORD_MIN_LENGTH }],
      }),
    [],
  );
