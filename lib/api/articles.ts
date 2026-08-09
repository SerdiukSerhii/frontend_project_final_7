import { api } from './api';
import type { GetArticlesParams, GetArticlesResponse } from '../../types/articles';

export const getArticles = async (params: GetArticlesParams = {}): Promise<GetArticlesResponse> => {
  const { data } = await api.get<GetArticlesResponse>('/articles', { params });
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
