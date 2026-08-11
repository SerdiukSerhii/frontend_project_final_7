import axios, { AxiosError } from 'axios';
import { ArticlesResponse } from '@/types/articles';

export type ApiError = AxiosError<{ error: string }>;

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Функція для отримання статей
export const fetchArticles = async (
  page: number = 1,
  filter: string = 'all',
  limit: number = 10
): Promise<ArticlesResponse> => {
  const response = await api.get<ArticlesResponse>('/articles', {
    params: {
      page,
      limit,
      filter,
    },
  });

  return response.data;
};
