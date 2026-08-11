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