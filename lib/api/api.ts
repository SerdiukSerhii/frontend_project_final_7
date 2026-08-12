import axios, { type AxiosError } from 'axios';

import type { ArticlesResponse } from '@/types/articles';

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ??
  'https://project-backend-final-7.onrender.com';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Функція для отримання статей
export const fetchArticles = async (
  page: number = 1,
): Promise<ArticlesResponse> => {
  const response = await api.get<ArticlesResponse>('/articles', {
    params: {
      page,
    },
  });

  return response.data;
};