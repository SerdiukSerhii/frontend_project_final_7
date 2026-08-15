import type { AddArticleFormValues } from '@/types/createArticle';

const DESCRIPTION_MAX_LENGTH = 300;

export const createArticleDescription = (
    articleText: string,
): string => {
    const normalizedText = articleText.trim().replace(/\s+/g, ' ');
    
    if (normalizedText.length <= DESCRIPTION_MAX_LENGTH) {
        return normalizedText;
    }
    
    const shortenedText = normalizedText.slice(
        0,
        DESCRIPTION_MAX_LENGTH - 3,
    );

    const lastSpaceIndex = shortenedText.lastIndexOf(' ');
    
    const description =
        lastSpaceIndex > 0
        ? shortenedText.slice(0, lastSpaceIndex)
        : shortenedText;

    return `${description}...`;
};

export const getCurrentLocalDate = (): string => {
    const currentDate = new Date();
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(
        2,
        '0',
    );
    
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
};

export const buildCreateArticleFormData = (
    values: AddArticleFormValues,
): FormData => {
    if (!values.image) {
        throw new Error('Article photo is required');
    }
    
    const formData = new FormData();
    
    formData.append('title', values.title.trim());
    formData.append('article', values.article);
    formData.append(
        'desc',
        createArticleDescription(values.articleText),
    );
    
    formData.append('date', getCurrentLocalDate());
    formData.append('img', values.image);

    return formData;
};