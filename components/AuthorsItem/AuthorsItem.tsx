import Image from 'next/image';
import Link from 'next/link';
import type { Author } from '@/types/articles';
import css from './AuthorsItem.module.css';

interface AuthorsItemProps {
  author: Author;
}

export default function AuthorsItem({ author }: AuthorsItemProps) {
  const { _id, name, avatarUrl } = author;
  const firstName = name.trim().split(/\s+/)[0];

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
              sizes="(min-width: 768px) 262px, 148px"
              className={css.image}
              unoptimized
            />
          )}
        </div>

        <p className={css.name}>{firstName}</p>
      </Link>
    </li>
  );
}
