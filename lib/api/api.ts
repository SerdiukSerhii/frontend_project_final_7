import axios, { type AxiosError } from 'axios';

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;

const baseURL =
  process.env.NEXT_PUBLIC_API_TARGET === 'render'
    ? process.env.NEXT_PUBLIC_RENDER_API_URL
    : process.env.NEXT_PUBLIC_LOCAL_API_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
