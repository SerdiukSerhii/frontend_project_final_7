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
  isSaved?: boolean;
  isOwner?: boolean;
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
  articles: Article[];
}

export interface GetSavedArticlesResponse {
  status: string;
  code: number;
  data: Article[];
}

export interface UserArticlesData {
  articles: Article[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetUserArticlesResponse {
  status: number;
  message: string;
  data: UserArticlesData;
}
