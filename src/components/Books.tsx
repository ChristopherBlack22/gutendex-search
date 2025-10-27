'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import BookList from './BookList';
import { useGetBooks, getBooks } from '@/services/books';
import { useSearchParams } from 'next/navigation';
import Pagination from '@/components/Pagination';

const BOOKS_PER_PAGE = 32;

function Books() {
  const searchParams = useSearchParams();
  const { data, isLoading, isError, refetch } = useGetBooks(searchParams, {
    enabled: !!searchParams.size,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.next) {
      const nextParamsString = data.next?.split('?')[1];
      queryClient.prefetchQuery({
        queryKey: ['books', nextParamsString],
        queryFn: () => getBooks(nextParamsString),
      });
    }
  }, [queryClient, data]);

  const pages = data?.count ? Math.ceil(data.count / BOOKS_PER_PAGE) : 0;
  const currentPage = Number(searchParams.get('page') ?? '1');
  const navToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    window.history.pushState({}, '', `?${params.toString()}`);
  };

  let firstResult = 0;
  let lastResult = 0;
  if (data?.results.length) {
    firstResult = (currentPage - 1) * BOOKS_PER_PAGE + 1;
    lastResult = firstResult + data.results.length - 1;
  }

  return (
    <section>
      <div className="centered-content fill-height">
        {isLoading && <p className="txt-cntr">Fetching books...</p>}
        {isError && (
          <div className="txt-cntr">
            <p>Error fetching books.</p>
            <button type="button" onClick={() => refetch()}>
              Try again
            </button>
          </div>
        )}
        {!isLoading && !data?.results.length && <p className="txt-cntr">No books found.</p>}
        {!isLoading && !!data?.results.length && (
          <div>
            <p className="txt-dark">
              <em>
                Showing <strong>{`${firstResult}-${lastResult}`}</strong> of{' '}
                <strong>{data.count}</strong> books
              </em>
            </p>
            <BookList data={data} />
          </div>
        )}
      </div>
      <footer className="centered-content" style={{ padding: '1.5rem' }}>
        {pages > 1 && (
          <Pagination totalPages={pages} currentPage={currentPage} onPageChange={navToPage} />
        )}
      </footer>
    </section>
  );
}

export default Books;
