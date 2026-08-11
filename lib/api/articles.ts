import { api } from './api';
import type { GetArticlesParams, ArticlesResponse } from '@/types/articles';

export const getArticles = async (params?: GetArticlesParams): Promise<ArticlesResponse> => {
  const { data } = await api.get<ArticlesResponse>('/articles', {
    params: {
      page: params?.page || 1,
      perPage: params?.perPage,
      category: params?.category,
      //limit: params?.limit || 10,
      //filter: params?.filter || 'All',
      //type: params?.filter?.toLowerCase() || 'all',
    },
  });
  return data;
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
