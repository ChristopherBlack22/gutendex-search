import Image from 'next/image';
import { AiOutlineDownload } from 'react-icons/ai';
import { type Book } from '@/types/books';

function BookCard({ book }: { book: Book }) {
  const imageURL = book.formats['image/jpeg'];
  const htmlURL = book.formats['text/html; charset=utf-8'] || book.formats['text/html'];
  const authors = book.authors.map((author) => author.name).join(',  ');
  const subjects = [
    ...new Set(
      book.subjects.reduce<string[]>((acc, subject) => {
        acc.push(...subject.split(' -- '));
        return acc;
      }, [])
    ),
  ]
    .filter((subject) => subject.length <= 20 && !subject.includes(',') && !subject.includes('('))
    .sort();

  return (
    <div className="book card flex-row">
      <div className="align-self-cntr">
        <Image src={imageURL} alt={book.title} width={80} height={120} className="img" />
      </div>
      <div className="flex-col just-space-btw fill-width">
        <div>
          <div className="flex-row just-space-btw">
            <h2 className="normal txt-dark">{book.title}</h2>
            <span className="tag downloads">
              <AiOutlineDownload size={16} />
              <span>{book.download_count}</span>
            </span>
          </div>
          <p className="author-name">{authors}</p>
        </div>
        <div className="topics">
          {subjects.slice(0, 6).map((subject) => (
            <span key={subject} className="tag topic">
              {subject}
            </span>
          ))}
        </div>
        <a href={htmlURL} target="_blank" className="btn btn-secondary btn-link">
          Read online
        </a>
      </div>
    </div>
  );
}

export default BookCard;
