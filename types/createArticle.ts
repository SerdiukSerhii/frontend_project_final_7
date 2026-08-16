import type { Article } from './articles';

export interface AddArticleFormValues {
    title: string;
    article: string;
    articleText: string;
    image: File | null;
}

export interface CreateArticleResponse {
    status: 'success';
    code: number;
    data: Article;
}

export const initialAddArticleFormValues: AddArticleFormValues = {
    title: '',
    article: '',
    articleText: '',
    image: null,
};