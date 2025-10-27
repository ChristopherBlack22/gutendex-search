import { ReadonlyURLSearchParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { axiosGutendexAPI } from '@/services/api/axios';
import { type GetBooksResponse } from '@/types/books';

export const getBooks = async (paramsString: string): Promise<GetBooksResponse> => {
  const response = await axiosGutendexAPI.get(`/books/?${paramsString}`);
  return response?.data;
};

export const useGetBooks = (
  searchParams: ReadonlyURLSearchParams,
  options?: Omit<UseQueryOptions<GetBooksResponse, AxiosError>, 'queryKey' | 'queryFn'>
): UseQueryResult<GetBooksResponse, AxiosError> => {
  const paramsString = searchParams.toString();
  return useQuery({
    queryKey: ['books', paramsString],
    queryFn: () => getBooks(paramsString),
    ...options,
  });
};
