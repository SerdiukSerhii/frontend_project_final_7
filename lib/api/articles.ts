import { api } from './api';

interface AddToSavedResponse {
  status: number;
  message: string;
  data: string[];
}

export const addArticleToSaved = async (articleId: string) => {
  const { data } = await api.post<AddToSavedResponse>(
    `/users/saved-articles/${articleId}`
  );
  return data;
};