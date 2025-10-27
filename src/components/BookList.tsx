import BookCard from './BookCard';
import { type GetBooksResponse } from '@/types/books';

function BookList({ data }: { data: GetBooksResponse }) {
  return (
    <div>
      {data?.results.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookList;
