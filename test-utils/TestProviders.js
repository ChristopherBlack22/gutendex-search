import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
  // ...other properties
};

jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

const Wrapper = ({ children }) => {
  return (
    <QueryClientProvider client={new QueryClient({ retry: false })}>{children}</QueryClientProvider>
  );
};

export const renderWithProviders = (component, options) => {
  return {
    user: userEvent.setup(),
    ...render(component, { wrapper: Wrapper, ...options }),
  };
};
