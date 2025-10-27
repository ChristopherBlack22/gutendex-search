import { renderWithProviders } from '../../test-utils/TestProviders';
import { useSearchParams } from 'next/navigation';
import SearchForm from '../../src/components/SearchForm';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));
window.history.pushState = jest.fn();
const mockSearchParams = new URLSearchParams({
  search: 'test search',
  topic: 'fiction',
  author_year_start: '1800',
  author_year_end: '1900',
  languages: ['en', 'fr'],
  copyright: 'false',
});
const mockEmptySearchParams = new URLSearchParams();
beforeEach(() => {
  jest.clearAllMocks();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('SearchForm Component', () => {
  it('renders title/author fields with no searchParams', () => {
    useSearchParams.mockReturnValue(mockEmptySearchParams);
    const { getByLabelText, getByRole } = renderWithProviders(<SearchForm />);
    const searchInput = getByLabelText(/Title\/Author/i);
    expect(searchInput).toBeVisible();
    expect(searchInput).toHaveValue('');
    const topicInput = getByLabelText(/Topics/i);
    expect(topicInput).toBeVisible();
    expect(topicInput).toHaveValue('');
    const dateStartInput = getByLabelText(/from/i);
    expect(dateStartInput).toBeVisible();
    expect(dateStartInput).toHaveValue('');
    const dateEndInput = getByLabelText(/^to$/i);
    expect(dateEndInput).toBeVisible();
    expect(dateEndInput).toHaveValue('');
    const languagesInput = getByLabelText(/languages/i);
    expect(languagesInput).toBeVisible();
    expect(languagesInput).toHaveValue('');
    const copyrightTrueInput = getByLabelText(/^confirmed/i);
    expect(copyrightTrueInput).toBeVisible();
    expect(copyrightTrueInput).not.toBeChecked();
    const copyrightFalseInput = getByLabelText(/unconfirmed/i);
    expect(copyrightFalseInput).toBeVisible();
    expect(copyrightFalseInput).not.toBeChecked();
    const copyrightAllInput = getByLabelText(/all/i);
    expect(copyrightAllInput).toBeVisible();
    expect(copyrightAllInput).toBeChecked();
    const searchBtn = getByRole('button', { name: /search/i });
    expect(searchBtn).toBeVisible();
    expect(searchBtn).not.toBeEnabled();
  });
  it('renders title/author fields with searchParams', () => {
    useSearchParams.mockReturnValue(mockSearchParams);
    const { getByLabelText, getByText, getByRole } = renderWithProviders(<SearchForm />);
    const searchInput = getByLabelText(/Title\/Author/i);
    expect(searchInput).toBeVisible();
    expect(searchInput).toHaveValue('test search');
    const topicInput = getByLabelText(/Topics/i);
    expect(topicInput).toBeVisible();
    expect(topicInput).toHaveValue('fiction');
    const dateStartInput = getByLabelText(/from/i);
    expect(dateStartInput).toBeVisible();
    expect(dateStartInput).toHaveValue('1800');
    const dateEndInput = getByLabelText(/^to$/i);
    expect(dateEndInput).toBeVisible();
    expect(dateEndInput).toHaveValue('1900');
    const languagesInput = getByLabelText(/languages/i);
    expect(languagesInput).toBeVisible();
    const langOne = getByText('English');
    expect(langOne).toBeVisible();
    const langTwo = getByText('French');
    expect(langTwo).toBeVisible();
    const copyrightTrueInput = getByLabelText(/^confirmed/i);
    expect(copyrightTrueInput).toBeVisible();
    expect(copyrightTrueInput).not.toBeChecked();
    const copyrightFalseInput = getByLabelText(/unconfirmed/i);
    expect(copyrightFalseInput).toBeVisible();
    expect(copyrightFalseInput).toBeChecked();
    const copyrightAllInput = getByLabelText(/all/i);
    expect(copyrightAllInput).toBeVisible();
    expect(copyrightAllInput).not.toBeChecked();
    const searchBtn = getByRole('button', { name: /search/i });
    expect(searchBtn).toBeVisible();
    expect(searchBtn).not.toBeEnabled();
  });
  it('allows the user to search by title/author', async () => {
    useSearchParams.mockReturnValue(mockEmptySearchParams);
    const { getByLabelText, getByRole, user } = renderWithProviders(<SearchForm />);
    const searchInput = getByLabelText(/Title\/Author/i);
    expect(searchInput).toHaveValue('');
    await user.type(searchInput, 'new search');
    expect(searchInput).toHaveValue('new search');
    const searchBtn = getByRole('button', { name: /search/i });
    expect(searchBtn).toBeEnabled();
    await user.click(searchBtn);
    expect(window.history.pushState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('?page=1&search=new+search')
    );
  });
  it('allows the user to search by topic', async () => {
    useSearchParams.mockReturnValue(mockEmptySearchParams);
    const { getByLabelText, getByRole, user } = renderWithProviders(<SearchForm />);
    const topicInput = getByLabelText(/topic/i);
    expect(topicInput).toHaveValue('');
    await user.type(topicInput, 'new search');
    expect(topicInput).toHaveValue('new search');
    const searchBtn = getByRole('button', { name: /search/i });
    expect(searchBtn).toBeEnabled();
    await user.click(searchBtn);
    expect(window.history.pushState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('?page=1&topic=new+search')
    );
  });
  it('allows the user to search by author_year_start', async () => {
    useSearchParams.mockReturnValue(mockEmptySearchParams);
    const { getByLabelText, getByRole, user } = renderWithProviders(<SearchForm />);
    const startDateInput = getByLabelText(/from/i);
    expect(startDateInput).toHaveValue('');
    await user.type(startDateInput, '999');
    expect(startDateInput).toHaveValue('999');
    const searchBtn = getByRole('button', { name: /search/i });
    expect(searchBtn).toBeEnabled();
    await user.click(searchBtn);
    expect(window.history.pushState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('?page=1&author_year_start=999')
    );
  });
  it('allows the user to search by author_year_end', async () => {
    useSearchParams.mockReturnValue(mockEmptySearchParams);
    const { getByLabelText, getByRole, user } = renderWithProviders(<SearchForm />);
    const endDateInput = getByLabelText(/^to$/i);
    expect(endDateInput).toHaveValue('');
    await user.type(endDateInput, '{ArrowUp}');
    expect(endDateInput).toHaveValue('1');
    const searchBtn = getByRole('button', { name: /search/i });
    expect(searchBtn).toBeEnabled();
    await user.click(searchBtn);
    expect(window.history.pushState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('?page=1&author_year_end=1')
    );
  });
  it('allows the user to search by languages', async () => {
    useSearchParams.mockReturnValue(mockEmptySearchParams);
    const { getByLabelText, getByRole, user } = renderWithProviders(<SearchForm />);
    const languagesInput = getByLabelText(/languages/i);
    expect(languagesInput).toBeVisible();
    await user.click(languagesInput);
    await user.type(languagesInput, 'english{enter}');
    await user.type(languagesInput, 'french{enter}');
    const searchBtn = getByRole('button', { name: /search/i });
    expect(searchBtn).toBeEnabled();
    await user.click(searchBtn);
    expect(window.history.pushState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('?page=1&languages=en%2Cfr')
    );
  });
  it('allows the user to search by copyright confirmed', async () => {
    useSearchParams.mockReturnValue(mockEmptySearchParams);
    const { getByLabelText, getByRole, user } = renderWithProviders(<SearchForm />);
    const copyrightConfirmedInput = getByLabelText(/^confirmed/i);
    expect(copyrightConfirmedInput).not.toBeChecked();
    await user.click(copyrightConfirmedInput);
    expect(copyrightConfirmedInput).toBeChecked();
    const searchBtn = getByRole('button', { name: /search/i });
    expect(searchBtn).toBeEnabled();
    await user.click(searchBtn);
    expect(window.history.pushState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('?page=1&copyright=true')
    );
  });
  it('allows the user to search by copyright unconfirmed', async () => {
    useSearchParams.mockReturnValue(mockEmptySearchParams);
    const { getByLabelText, getByRole, user } = renderWithProviders(<SearchForm />);
    const copyrightUnconfirmedInput = getByLabelText(/unconfirmed/i);
    expect(copyrightUnconfirmedInput).not.toBeChecked();
    await user.click(copyrightUnconfirmedInput);
    expect(copyrightUnconfirmedInput).toBeChecked();
    const searchBtn = getByRole('button', { name: /search/i });
    expect(searchBtn).toBeEnabled();
    await user.click(searchBtn);
    expect(window.history.pushState).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.stringContaining('?page=1&copyright=false')
    );
  });
});
