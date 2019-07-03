import axios from 'axios';

export default function createApiClient({
  axiosConfig = {},
  selectToken,
  onApiCallStart,
  onApiCallFinish,
  onError,
}) {
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