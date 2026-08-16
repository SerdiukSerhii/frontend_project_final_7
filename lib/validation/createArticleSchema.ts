import * as Yup from 'yup';

const MAX_IMAGE_SIZE = 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
];

export const createArticleSchema = Yup.object({
    title: Yup.string()
        .trim()
        .required('Article title is required')
        .min(3, 'Article title must be at least 3 characters')
        .max(48, 'Article title must be at most 48 characters'),

    article: Yup.string().required('Article text is required'),

    articleText: Yup.string()
        .trim()
        .required('Article text is required')
        .min(100, 'Article text must be at least 100 characters'),

    image: Yup.mixed<File>()
        .nullable()
        .required('Article photo is required')
        .test(
            'file-size',
            'Photo size must not exceed 1 MB',
            file => !file || file.size <= MAX_IMAGE_SIZE,
    )
        .test(
            'file-type',
            'Only JPEG, PNG or WebP photos are allowed',
            file => !file || ALLOWED_IMAGE_TYPES.includes(file.type),
    ),
});