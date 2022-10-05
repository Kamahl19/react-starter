import { useMemo } from 'react';
import { type FormRule } from 'antd';

import { PASSWORD_MIN_LENGTH } from 'api';

const createRules = <T extends Record<string, FormRule[]>>(rules: T): Record<keyof T, FormRule[]> =>
  rules;

export const useValidationRules = () =>
  useMemo(
    () =>
      createRules({
        requiredString: [{ type: 'string', required: true }],
        email: [{ type: 'email', required: true }],
        password: [{ type: 'string', required: true, min: PASSWORD_MIN_LENGTH }],
      }),
    []
  );
