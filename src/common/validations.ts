import { type FormRule } from 'antd';

export const createRules = <T extends Record<string, FormRule[]>>(
  rules: T
): Record<keyof T, FormRule[]> => rules;

export const requiredStringRule = {
  type: 'string',
  required: true,
} as const;

export const requiredEmailRule = {
  type: 'email',
  required: true,
} as const;
