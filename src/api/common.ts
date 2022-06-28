export type ApiError = {
  status: number;
  message: string;
};

export type ErrorResponse = {
  error: ApiError;
};
