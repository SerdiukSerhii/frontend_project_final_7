import Link from 'next/link';
import type { Author } from '../CreatorsItem/CreatorsItem';
import CreatorsItem from '../CreatorsItem/CreatorsItem';
import css from './Creators.module.css';

interface CreatorsProps {
  authors?: Author[];
}
const DEFAULT_AUTHORS: Author[] = [
  {
    _id: '6881563901add19ee16fcff2',
    name: 'Анастасія Олійник',
    avatarUrl: 'https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff2.webp',
  },
  {
    _id: '6881563901add19ee16fcff3',
    name: 'Назар Ткаченко',
    avatarUrl: 'https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff3.webp',
  },
  {
    _id: '6881563901add19ee16fcff4',
    name: 'Єва Бондаренко',
    avatarUrl: 'https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff4.webp',
  },
  {
    _id: '6881563901add19ee16fcff5',
    name: 'Дмитро Романенко',
    avatarUrl: 'https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff5.webp',
  },
  {
    _id: '6881563901add19ee16fcff6',
    name: 'Олександра Бондаренко',
    avatarUrl: 'https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff6.webp',
  },
  {
    _id: '6881563901add19ee16fcff7',
    name: 'Олександр Шевчук',
    avatarUrl: 'https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcff7.webp',
  },
];

export default function Creators({ authors = [] }: CreatorsProps) {
  const displayAuthors = authors.length > 0 ? authors : DEFAULT_AUTHORS;

  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.resultsCreators}>
          <h2 className={css.titleCreators}>Top Creators</h2>

          <Link
            href="/authors"
            className={css.linkAllCreators}
          >
            Go to all Creators
            <span className={css.iconWrapper}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={css.arrowIcon}
              >
                <path
                  d="M0.25 14.5L14.4945 0.25M14.4946 7.9216L14.4945 0.25H6.82296"
                  stroke="var(--green-darker, #374F42)"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>

        <ul className={css.authorsContainer}>
          {displayAuthors.slice(0, 6).map(author => (
            <CreatorsItem
              key={author._id}
              author={author}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
