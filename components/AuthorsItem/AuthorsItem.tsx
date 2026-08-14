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
    <Link
      href={`/authors/${_id}`}
      className={css.card}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={name}
          width={148}
          height={148}
          className={css.avatar}
        />
      ) : null}

      <p className={css.name}>{name}</p>
    </Link>
  );
}
