import { api } from './api';
import type {
  Article,
  GetArticlesParams,
  GetArticlesResponse,
  GetSavedArticlesResponse,
  GetUserArticlesResponse,
} from '@/types/articles';

export const getArticles = async (params?: GetArticlesParams): Promise<GetArticlesResponse> => {
  const { data } = await api.get<GetArticlesResponse>('/articles', {
    params: {
      page: params?.page || 1,
      perPage: params?.perPage,
      category: params?.category,
    },
  });

  return data;
};

interface GetArticleByIdResponse {
  status: number;
  message: string;
  data: Article;
}

export const getArticleById = async (articleId: string): Promise<Article> => {
  const { data } = await api.get<GetArticleByIdResponse>(`/articles/${articleId}`);
  return data.data;
};

export const getRelatedArticles = async (
  currentArticleId: string,
  count = 3
): Promise<Article[]> => {
  const { articles } = await getArticles({ perPage: 20 });

  const pool = articles.filter(article => article._id !== currentArticleId);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
};

interface AddToSavedResponse {
  status: number;
  message: string;
  data: string[];
}

export const addArticleToSaved = async (articleId: string) => {
  const { data } = await api.post<AddToSavedResponse>(`/users/saved-articles/${articleId}`);
  return data;
};

export const removeArticleFromSaved = async (articleId: string) => {
  const { data } = await api.delete<AddToSavedResponse>(`/users/saved-articles/${articleId}`);
  return data;
};

export const getUserArticles = async (
  userId: string,
  page = 1,
  limit = 12
): Promise<GetUserArticlesResponse> => {
  const { data } = await api.get<GetUserArticlesResponse>(`/articles/user/${userId}`, {
    params: { page, limit },
  });
  return data;
};

export const getSavedArticles = async (): Promise<Article[]> => {
  const { data: response } = await api.get<GetSavedArticlesResponse>('/users/saved-articles');

  return response.data ?? [];
};
