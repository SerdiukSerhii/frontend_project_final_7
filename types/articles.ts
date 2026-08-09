export interface Author {
  _id: string;
  name: string;
  avatarUrl?: string;
}

export interface Article {
  _id: string;
  img: string;
  title: string;
  desc: string;
  article: string;
  rate: number;
  ownerId: string | Author;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetArticlesParams {
  page?: number;
  perPage?: number;
  category?: 'general' | 'popular';
}

export interface GetArticlesResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalArticles: number;
  articlesQuery: Article[];
}
