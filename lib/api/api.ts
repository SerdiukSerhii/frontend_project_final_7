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
