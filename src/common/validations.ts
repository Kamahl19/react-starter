import { type FormRule } from 'antd';

export const createRules = <T extends Record<string, FormRule[]>>(
  rules: T,
): Record<keyof T, FormRule[]> => rules;
