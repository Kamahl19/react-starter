import { type FormRule } from 'antd';

/**
 * Types
 */

export type ApiError = {
  status: number;
  message: string;
};

export type ErrorResponse = {
  error: ApiError;
};

/**
 * Utils
 */

export const createValidation = <P>(rules: Record<keyof P, FormRule[]>) => rules;
