import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.RENDER_API_URL
    : process.env.LOCAL_API_URL;;

export const serverApi = axios.create({
  baseURL,
});

import type {
  GetArticlesParams,
  GetArticlesResponse,
} from './../../types/articles';

export async function getArticlesServer(
  params?: GetArticlesParams,
): Promise<GetArticlesResponse> {
  const { data } = await serverApi.get<GetArticlesResponse>(
    '/articles',
    {
      params: {
        page: params?.page ?? 1,
        perPage: params?.perPage ?? 12,
        category: params?.category,
      },
    },
  );

  return data;
}