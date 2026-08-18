import axios, { type AxiosError } from 'axios';

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;

const baseURL = process.env.NEXT_PUBLIC_FRONT_API_URL + '/api';

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// const localApiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;
// const renderApiUrl = process.env.NEXT_PUBLIC_RENDER_API_URL;

// const baseURL = process.env.NODE_ENV === 'production' ? renderApiUrl : localApiUrl;

// export const api = axios.create({
//   baseURL,
//   withCredentials: true,
// });

// type RetryConfig = InternalAxiosRequestConfig & {
//   _usedRenderFallback?: boolean;
// };

// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const config = error.config as RetryConfig | undefined;

//     const isLocalApi = config?.baseURL === localApiUrl;

//     const isNetworkError =
//       error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT';

//     if (config && isLocalApi && isNetworkError && !config._usedRenderFallback) {
//       config._usedRenderFallback = true;
//       config.baseURL = renderApiUrl;

//       return api(config);
//     }

//     return Promise.reject(error);
//   }
// );
