import AuthorsItem from '../AuthorsItem/AuthorsItem';
import css from './AuthorsList.module.css';
import type { Author } from '@/types/articles';

interface AuthjorsListProps {
  authors: Author[];
}

export default function AuthorsList({ authors }: AuthjorsListProps) {
  if (authors.length === 0) {
    return (
      <section>
        <p className={css.empty}>No authors found.</p>
      </section>
    );
  }

  return (
    <section>
      <ul className={css.authorList}>
        {authors.map(author => (
          <AuthorsItem
            key={author._id}
            author={author}
          />
        ))}
      </ul>
    </section>
  );
}
