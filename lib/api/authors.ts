import { api } from './api';

export interface Author {
  id: string;
  name: string;
  avatar?: string;
}

export interface GetAuthorsResponse {
  authors: Author[];
  page: number;
  totalPages: number;
  total?: number;
}

export async function getAuthors(page = 1, limit = 20): Promise<GetAuthorsResponse> {
  const { data } = await api.get<GetAuthorsResponse>('/users', {
    params: { page, limit },
  });
  return data;
}
