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

export interface CreateArticlePayload {
  title: string;
  desc: string;
  article: string;
  date: string;
  author: string;
  img: File;
}

export const createArticle = async (payload: CreateArticlePayload) => {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('desc', payload.desc);
  formData.append('article', payload.article);
  formData.append('date', payload.date);
  formData.append('author', payload.author);
  formData.append('img', payload.img);

  const { data } = await api.post('/articles', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
};