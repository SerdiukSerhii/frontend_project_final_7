import Image from 'next/image';
import Link from 'next/link';
import type { Author } from '@/types/articles';
import css from './AuthorsItem.module.css';

interface AuthorsItemProps {
  author: Author;
}

export default function AuthorsItem({ author }: AuthorsItemProps) {
  const { _id, name, avatarUrl } = author;

  return (
    <li className={css.item}>
      <Link
        href={`/authors/${_id}`}
        className={css.card}
      >
        <div className={css.imageWrapper}>
          {avatarUrl && (
            <Image
              src={avatarUrl}
              alt={name}
              fill
              sizes="(min-width: 1440px) 200px, (min-width: 768px) 180px, 160px"
              className={css.image}
            />
          )}
        </div>

        <p className={css.name}>{name}</p>
      </Link>
    </li>
  );
}
