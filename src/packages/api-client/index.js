import axios from 'axios';

export default function createApiClient({
  selectToken,
  onApiCallStart,
  onApiCallFinish,
  onError,
  axiosConfig = {},
}) {
  const apiClient = axios.create({
    responseType: 'json',
    baseURL: process.env.REACT_APP_API_URL,
    ...axiosConfig,
  });

  apiClient.interceptors.request.use(async config => {
    const token = selectToken();

    if (token) {
      config.headers.common = config.headers.common || {};
      config.headers.common['Authorization'] = `Bearer ${token}`;
    }

    onApiCallStart(config.apiCallId);

    return config;
  });

  apiClient.interceptors.response.use(
    response => {
      onApiCallFinish(response.config.apiCallId);

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
