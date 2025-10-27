import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/utils/get-query-client';
import { getBooks } from '@/services/books';
// import styles from './page.module.css';
// import BookSearch from './BookSearch';
import SearchForm from '../components/SearchForm';
import Books from '../components/Books';
import { cleanSearchParamsObj } from '@/utils/search';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryClient = getQueryClient();
  const params = await searchParams;
  const cleanedParams = cleanSearchParamsObj(params);
  const paramsString = new URLSearchParams(cleanedParams).toString();

  if (paramsString.length) {
    await queryClient.prefetchQuery({
      queryKey: ['books', paramsString],
      queryFn: () => getBooks(paramsString),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section>
        <SearchForm />
      </section>
      <Books />
    </HydrationBoundary>
  );
}
