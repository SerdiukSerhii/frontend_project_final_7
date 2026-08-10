import { api } from './api';
export const getArticles = async () => {
  const { data } = await api.get('/articles');
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
  const { data } = await api.delete<AddToSavedResponse>(
    `/users/saved-articles/${articleId}`
  );
  return data;
};