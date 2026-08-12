import axios, { type AxiosError } from 'axios';

import type { GetArticlesResponse } from '@/types/articles';

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'https://project-backend-final-7.onrender.com';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const fetchArticles = async (page: number = 1): Promise<GetArticlesResponse> => {
  const response = await api.get<GetArticlesResponse>('/articles', {
    params: {
      page,
    },
  });

  return response.data;
};
