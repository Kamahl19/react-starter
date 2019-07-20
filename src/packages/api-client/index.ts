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
};

export default function createApiClient({
  axiosConfig = {},
  selectToken,
  onApiCallStart,
  onApiCallFinish,
  onError,
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

    if (config.apiCallId) {
      onApiCallStart(config.apiCallId);
    }

    return config;
  });

  apiClient.interceptors.response.use(
    response => {
      if (response.config.apiCallId) {
        onApiCallFinish(response.config.apiCallId);
      }

      return response;
    },
    error => {
      onApiCallFinish(error.config.apiCallId);

      if (!axios.isCancel(error)) {
        onError(error);
        throw error;
      }
    }
  );

  return apiClient;
}
