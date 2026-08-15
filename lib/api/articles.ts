import { api } from './api';
import type { GetArticlesParams, GetArticlesResponse, ArticlesByUserResponse} from '@/types/articles';

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
export const getArticlesByUser = async (
  userId: string,
  params?: GetArticlesParams
): Promise<ArticlesByUserResponse> => {
  const { data } = await api.get<ArticlesByUserResponse>(
    `/articles/user/${userId}`,
    {
      params: {
        page: params?.page || 1,
        perPage: params?.perPage,
      },
    }
  );

  return data;
};