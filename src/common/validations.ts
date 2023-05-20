import { type FormRule } from 'antd';

import { PASSWORD_MIN_LENGTH } from 'api';

export const createRules = <T extends Record<string, FormRule[]>>(
  rules: T
): Record<keyof T, FormRule[]> => rules;

export const passwordRule = {
  required: true,
  type: 'string',
  min: PASSWORD_MIN_LENGTH,
} as const;

export const emailRule = {
  required: true,
  type: 'email',
} as const;
