export type Id = string;

/**
 * Auth
 */
export type User = {
  id: Id;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Token = string;

export type AuthResponse = {
  token: Token;
  user: User;
};

export type SignUpPayload = {
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ActivateAccountPayload = {
  userId: Id;
  token: Token;
};

export type ForgottenPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  email: string;
  password: string;
  token: Token;
};
