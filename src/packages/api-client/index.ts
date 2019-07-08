import axios, { AxiosRequestConfig, AxiosError } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    apiCallId?: string;
  }
}

type ApiClientParams = {
  axiosConfig: AxiosRequestConfig;
  selectToken: () => string;
  onApiCallStart: (config: AxiosRequestConfig) => void;
  onApiCallFinish: (config: AxiosRequestConfig) => void;
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

    onApiCallStart(config);

    return config;
  });

  apiClient.interceptors.response.use(
    response => {
      onApiCallFinish(response.config);

      return response;
    },
    error => {
      onApiCallFinish(error.config);

      if (!axios.isCancel(error)) {
        onError(error);
        throw error;
      }
    }
  );

  return apiClient;
}
