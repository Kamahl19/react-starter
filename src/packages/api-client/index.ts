import axios, { AxiosRequestConfig, AxiosError } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    apiCallId?: string;
  }
}

type ApiClientParams = {
  axiosConfig: AxiosRequestConfig;
  selectToken: () => string | null;
  onApiCallStart: (apiCallId: string) => void;
  onApiCallFinish: (apiCallId: string) => void;
  onError: (error: AxiosError) => void;
  defaultApiCallId: string;
};

export default function createApiClient({
  axiosConfig = {},
  selectToken,
  onApiCallStart,
  onApiCallFinish,
  onError,
  defaultApiCallId,
}: ApiClientParams) {
  const apiClient = axios.create({
    responseType: 'json',
    ...axiosConfig,
  });

  apiClient.interceptors.request.use(async config => {
    const token = selectToken();

    if (token) {
      config.headers.common = config.headers.common || {};
      config.headers.common['Authorization'] = `Bearer ${token}`;
    }

    onApiCallStart(config.apiCallId || defaultApiCallId);

    return config;
  });

  apiClient.interceptors.response.use(
    response => {
      onApiCallFinish(response.config.apiCallId || defaultApiCallId);

      return response;
    },
    error => {
      onApiCallFinish(error.config.apiCallId || defaultApiCallId);

      if (!axios.isCancel(error)) {
        onError(error);
        throw error;
      }
    }
  );

  return apiClient;
}
