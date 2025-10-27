import { renderWithProviders } from '../../test-utils/TestProviders';
import BookCard from '../../src/components/BookCard';

const mockBook = {
  id: 1,
  title: 'Test Book',
  subjects: ['Fiction', 'Adventure -- 19th century', 'Crime -- Drama', 'Action', 'Comedy'],
  authors: [
    { name: 'One, Author', birth_year: 1990, date_year: 2020 },
    { name: 'Two, Author', birth_year: 1980, date_year: null },
  ],
  formats: {
    'image/jpeg': 'http://example.com/cover.jpg',
    'text/html': 'http://example.com/book.html',
  },
  download_count: 1500,
};

describe('BookCard Component', () => {
  it('renders book title', () => {
    const { getByRole } = renderWithProviders(<BookCard book={mockBook} />);
    expect(getByRole('heading', { name: 'Test Book' })).toBeVisible();
  });
  it('renders book authors', () => {
    const { getByText } = renderWithProviders(<BookCard book={mockBook} />);
    expect(getByText('One, Author, Two, Author')).toBeVisible();
  });
  it('renders book download count', () => {
    const { container } = renderWithProviders(<BookCard book={mockBook} />);
    const tag = container.querySelector('.tag.downloads');
    expect(tag).toBeVisible();
    expect(tag).toHaveTextContent('1500');
  });
  it('renders an image with the correct src', () => {
    const { getByRole } = renderWithProviders(<BookCard book={mockBook} />);
    const image = getByRole('img');
    expect(image).toBeVisible();
    expect(image).toHaveAttribute('src', 'http://example.com/cover.jpg');
  });
  it('renders up to 6 subject tags', () => {
    const { container, getByText, queryByText } = renderWithProviders(<BookCard book={mockBook} />);
    const tags = container.querySelectorAll('.tag.topic');
    expect(tags).toHaveLength(6);
    const tag1 = getByText('19th century');
    expect(tag1).toBeVisible();
    const tag2 = getByText('Action');
    expect(tag2).toBeVisible();
    const tag3 = getByText('Adventure');
    expect(tag3).toBeVisible();
    const tag4 = getByText('Comedy');
    expect(tag4).toBeVisible();
    const tag5 = getByText('Crime');
    expect(tag5).toBeVisible();
    const tag6 = getByText('Drama');
    expect(tag6).toBeVisible();
    const tag7 = queryByText('Fiction');
    expect(tag7).not.toBeInTheDocument();
  });
  it('renders a link that navigates to the correct url', () => {
    const { getByRole } = renderWithProviders(<BookCard book={mockBook} />);
    const link = getByRole('link', { name: /read online/i });
    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', 'http://example.com/book.html');
  });
});
