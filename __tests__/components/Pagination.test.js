import { renderWithProviders } from '../../test-utils/TestProviders';
import Pagination from '../../src/components/Pagination';

const onPageChangeMock = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('Pagination Component', () => {
  it('renders first button which passes 1 to the onPageChange function', async () => {
    const { getByRole, user } = renderWithProviders(
      <Pagination currentPage={10} totalPages={20} onPageChange={onPageChangeMock} />
    );
    const firstBtn = getByRole('button', { name: /\</i });
    expect(firstBtn).toBeVisible();
    await user.click(firstBtn);
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });
  it('renders last button which passes the value of the last page to the onPageChange function', async () => {
    const { getByRole, user } = renderWithProviders(
      <Pagination currentPage={10} totalPages={20} onPageChange={onPageChangeMock} />
    );
    const lastBtn = getByRole('button', { name: /\>/i });
    expect(lastBtn).toBeVisible();
    await user.click(lastBtn);
    expect(onPageChangeMock).toHaveBeenCalledWith(20);
  });
  it('renders current button which is disabled', async () => {
    const { getByRole, user } = renderWithProviders(
      <Pagination currentPage={10} totalPages={20} onPageChange={onPageChangeMock} />
    );
    const currentBtn = getByRole('button', { name: /10/i });
    expect(currentBtn).toBeVisible();
    await user.click(currentBtn);
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });
  it('renders a maximum of 7 buttons', () => {
    const { getAllByRole } = renderWithProviders(
      <Pagination currentPage={10} totalPages={20} onPageChange={onPageChangeMock} />
    );
    const btns = getAllByRole('button');
    expect(btns).toHaveLength(7);
  });
  it('renders 4 button if there are only 2 pages', () => {
    const { getAllByRole } = renderWithProviders(
      <Pagination currentPage={1} totalPages={2} onPageChange={onPageChangeMock} />
    );
    const btns = getAllByRole('button');
    expect(btns).toHaveLength(4);
  });
  it('renders 5 button if there are only 3 pages', () => {
    const { getAllByRole } = renderWithProviders(
      <Pagination currentPage={1} totalPages={3} onPageChange={onPageChangeMock} />
    );
    const btns = getAllByRole('button');
    expect(btns).toHaveLength(5);
  });
  it('renders 6 button if there are only 4 pages', () => {
    const { getAllByRole } = renderWithProviders(
      <Pagination currentPage={1} totalPages={4} onPageChange={onPageChangeMock} />
    );
    const btns = getAllByRole('button');
    expect(btns).toHaveLength(6);
  });
});
