import Hero from '@/components/Hero/Hero';
import AboutUs from '@/components/About/AboutUs';
import PopularArticles from '@/components/PopularArticles/PopularArticles';
import Creators from '@/components/Creators/Creators';
import { getArticles } from '@/lib/api/articles';

const HomePage = async () => {
  const { articles } = await getArticles({
    page: 1,
    perPage: 12,
    category: 'popular',
  });

  const authors = Array.from(
    new Map(
      articles
        .map(article => article.ownerId)
        .filter((owner): owner is Exclude<typeof owner, string> => typeof owner !== 'string')
        .map(author => [author._id, author])
    ).values()
  ).slice(0, 6);

  return (
    <>
      <Hero />
      <AboutUs />
      <PopularArticles />
      <Creators authors={authors} />
    </>
  );
};

export default HomePage;
