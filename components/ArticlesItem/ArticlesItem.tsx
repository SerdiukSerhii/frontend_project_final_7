import Image from 'next/image';
import Link from 'next/link';
import css from './ArticlesItem.module.css';
import type { Article } from '../../types/articles';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks';

interface ArticlesItemProps {
  article: Article;
  isOwner?: boolean;
}

export default function ArticlesItem({ article, isOwner = false }: ArticlesItemProps) {
  const { _id, title, desc, img, ownerId } = article;

  const authorName = typeof ownerId === 'object' ? ownerId.name : 'Harmoniq Author';

  return (
    <li className={css.item}>
      <article className={css.card}>
        <div className={css.imageWrapper}>
          <Image
            src={img}
            alt={title}
            fill
            className={css.image}
          />
        </div>

        <div className={css.content}>
          {/* Имя автора вверху */}
          <p className={css.author}>{authorName}</p>

          {/* Заголовок статьи (ровно 2 строки с троеточием ...) */}
          <h3 className={css.title}>{title}</h3>

          {/* Описание статьи (ровно 3 строки с троеточием ...) */}
          <p className={css.description}>{desc}</p>
        </div>

        <div className={css.buttonsContainer}>
          <Link
            href={`/articles/${_id}`}
            className={css.learnMoreLink}
          >
            Learn more
          </Link>

          {isOwner ? (
            <Link
              href={`/articles/${_id}/edit`}
              className={css.actionBtn}
              aria-label="Edit article"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={css.icon}
              >
                <path
                  d="M14.5 14.5L4.08654 14.5H0.25L0.25 10.656L8.19712 2.69353L9.84135 1.04611C10.9008 -0.0153714 12.6185 -0.0153701 13.6779 1.04611C14.7373 2.1076 14.7373 3.8286 13.6779 4.89008L12.0337 6.5375L4.08654 14.5M8.19712 2.69353L12.0337 6.5375"
                  stroke="var(--green-darker, #374F42)"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ) : (
            <ButtonAddToBookmarks articleId={_id} />
          )}
        </div>
      </article>
    </li>
  );
}
